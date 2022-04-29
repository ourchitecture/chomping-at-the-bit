const fs = require('fs').promises;
const path = require('path');
const xmljs = require('xml-js');

const fileExists = async(path) => {
  try {
    await fs.stat(path);
    return true;
  } catch(e) {
    return false;
  }
}

const updateAdobeStockLicenseFile = async(adobeStockRootDirectoryPath, avatarFilePaths) => {

  const currentLicenseFilePath = path.join(adobeStockRootDirectoryPath, './LICENSE.md');

  console.info(`Updating Adobe Stock license file "${currentLicenseFilePath}"...`);

  const licenseFileListContent = avatarFilePaths.map((avatarFilePath) => {
    return `- ["${avatarFilePath}"](./avatars/${avatarFilePath})`;
  }).join('\n');

  const newLicenseFileAvatarListContent = `
<!-- BEGIN: avatar list -->
<!--
  IMPORTANT: this list is automatically generated.
  DO NOT EDIT!
-->
${licenseFileListContent}
<!-- END: avatar list -->`;

  const currentLicenseFileContent = await fs.readFile(currentLicenseFilePath, { encoding: 'utf-8' });
  const avatarBeginTag = '<!-- BEGIN: avatar list -->';
  const avatarBeginTagIx = currentLicenseFileContent.indexOf(avatarBeginTag);
  const avatarEndTag = '<!-- END: avatar list -->';
  const avatarEndTagIx = currentLicenseFileContent.indexOf(avatarEndTag) + avatarEndTag.length;

  const currentLicenseFileBeginContent = currentLicenseFileContent.substring(0, avatarBeginTagIx).trim();
  const currentLicenseFileEndContent = currentLicenseFileContent.substring(avatarEndTagIx).trim();

  // console.debug('Current license begin content', currentLicenseFileBeginContent);
  // console.debug('Current license end content', currentLicenseFileEndContent);
  // console.debug('Current license avatar list', currentLicenseFileContent.substring(avatarBeginTagIx, avatarEndTagIx));

  const newLicenseFileContent = `
${currentLicenseFileBeginContent}
${newLicenseFileAvatarListContent}
${currentLicenseFileEndContent}
`;

  // console.debug('New license content', newLicenseFileContent);

  await fs.writeFile(currentLicenseFilePath, newLicenseFileContent, { encoding: 'utf-8' });

  console.info(`Successfully updated Adobe Stock license file "${currentLicenseFilePath}".`);
};

async function generateAvatarComponentsAndStore(avatarRootDirectoryPath, avatarFilePaths) {

  console.log('Building Avatar components...');

  let newAvatarIndexFileImportContent = '';
  let newAvatarIndexFileExportContent = `export default [`;

  let avatarIx = 0;

  for (let avatarFileIx = 0; avatarFileIx < avatarFilePaths.length; avatarFileIx++) {
    const avatarFileName = avatarFilePaths[avatarFileIx];
    const avatarFilePath = path.join(avatarRootDirectoryPath, avatarFileName);
    const avatarFileExtension = path.extname(avatarFilePath);

    if (!avatarFileExtension.endsWith("svg")) {
      continue;
    }

    avatarIx++;

    const avatarName = avatarFileName.replace(avatarFileExtension, '');

    console.debug(`Processing avatar "${avatarName}"...`);

    const avatarComponentFileName = `${avatarName}.vue`;
    const componentCode = avatarName;
    const componentName = `OurAvatar${avatarIx}`;

    newAvatarIndexFileImportContent += `import ${componentName} from './${avatarComponentFileName}';\n`;
    newAvatarIndexFileExportContent += `
  {
    code: '${componentCode}',
    component: ${componentName},
  },`;

    const avatarSvgXml = await fs.readFile(avatarFilePath, { encoding: 'utf-8' });

    const avatarSvg = xmljs.xml2js(avatarSvgXml, { compact: true, spaces: 4 });

    avatarSvg.svg._attributes.class = `our-avatar our-${avatarName}`;

    let componentStyle = '';

    if (avatarSvg.svg.defs) {
      if (avatarSvg.svg.defs.style) {
        componentStyle = `
<style scoped>
${avatarSvg.svg.defs.style._text}
</style>`;

        // console.debug('Avatar <style>', componentStyle);
        delete avatarSvg.svg.defs.style;
      }

      // remove <defs> if all it had was <style>
      if (Object.keys(avatarSvg.svg.defs).length === 0) {
        delete avatarSvg.svg.defs;
      }
    }

    const newAvatarSvgXml = xmljs.js2xml(avatarSvg, { compact: true, ignoreComment: true, spaces: 0 });

    const avatarComponentContent = `<template>
  ${newAvatarSvgXml}
</template>
${componentStyle}
`;

    // console.debug('Avatar component content', avatarComponentContent);
    const avatarComponentFilePath = path.join('./src/components/avatars/', avatarComponentFileName);

    console.debug(`Avatar component file ${avatarComponentFilePath}`);

    if (await fileExists(avatarComponentFilePath)) {
      console.info(`Deleting file "${avatarComponentFilePath}"...`);
      await fs.unlink(avatarComponentFilePath);
      console.info(`Successfully deleted file "${avatarComponentFilePath}".`);
    }

    console.info(`Creating file "${avatarComponentFilePath}"...`);
    await fs.writeFile(avatarComponentFilePath, avatarComponentContent, { encoding: 'utf-8' });
    console.info(`Successfully created file "${avatarComponentFilePath}".`);

    console.debug(`Successfully processed avatar "${avatarName}".`);
  }

  newAvatarIndexFileExportContent += `
];`;

  const newAvatarIndexFileContent = `${newAvatarIndexFileImportContent}
${newAvatarIndexFileExportContent}
`;

  // console.debug('New avatar component index file content', newAvatarIndexFileContent);
  const newAvatarIndexFilePath = './src/components/avatars/index.ts';

  if (await fileExists(newAvatarIndexFilePath)) {
    console.info(`Deleting file "${newAvatarIndexFilePath}"...`);
    await fs.unlink(newAvatarIndexFilePath);
    console.info(`Successfully deleted file "${newAvatarIndexFilePath}".`);
  }

  console.info(`Creating file "${newAvatarIndexFilePath}"...`);
  await fs.writeFile(newAvatarIndexFilePath, newAvatarIndexFileContent, { encoding: 'utf-8' });
  console.info(`Successfully created file "${newAvatarIndexFilePath}".`);

  console.log('Successfully built Avatar components.');
}

const main = async() => {

  const adobeStockRootDirectoryPath = '../media/stock.adobe.com/';

  const avatarRootDirectoryPath = path.join(adobeStockRootDirectoryPath, './avatars/');

  const avatarFilePaths = await fs.readdir(avatarRootDirectoryPath);

  await updateAdobeStockLicenseFile(adobeStockRootDirectoryPath, avatarFilePaths);

  await generateAvatarComponentsAndStore(avatarRootDirectoryPath, avatarFilePaths);
};

main();
