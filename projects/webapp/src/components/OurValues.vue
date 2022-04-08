<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Our Values</ion-card-title>
    </ion-card-header>
    <ion-card-content class="ion-padding">
      <div>
        <ion-chip v-for="value in values" :key="value.code" v-on:click="describeSelectedValue(value)">
          <ion-label>{{ value.title }}</ion-label>
        </ion-chip>
      </div>
      <ion-modal
        :is-open="isSelectedValueVisible"
        :swipe-to-close="true"
        :presenting-element="$parent.$refs.ionRouterOutlet"
        @didDismiss="toggleSelectedValueVisible(false)"
        >
        <ion-header translucent>
          <ion-toolbar>
            <ion-title>Our Values: {{ selectedValue.title }}</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="toggleSelectedValueVisible(false)">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content fullscreen class="ion-padding value-description" v-html="selectedValue.description"></ion-content>
      </ion-modal>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';

import { defineComponent, Ref, ref } from 'vue';

interface OurValue {
  title: string;
  description: string;
}

export default defineComponent({
  name: 'OurHomePage',
  components: {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonChip,
    IonContent,
    IonHeader,
    IonLabel,
    IonModal,
    IonTitle,
    IonToolbar,
  },
  setup() {
    const values: OurValue[] = [
      {
        title: 'Agility',
        description: `
<p>
  Approaches to leadership, strategy and decision making must have flexibility to change as the context that surrounds them changes.<br>
  <br>
  The <a href="https://agilemanifesto.org/">Agile Manifesto purports:</a><br>
  <blockquote>
    "We are uncovering better ways of developing software by doing it and helping others do it.<br>
    Through this work we have come to value:<br>
    <ul>
      <li>Individuals and interactions over processes and tools</li>
      <li>Working software over comprehensive documentation</li>
      <li>Customer collaboration over contract negotiation</li>
      <li>Responding to change over following a plan</li>
    </ul>
    That is, while there is value in the items on the right, we value the items on the left more."
  </blockquote>
</p>
        `,
      },
      {
        title: 'Community',
        description: `
<blockquote>
  "There is no power for change greater than a community discovering what it cares about."<br>
  &mdash; Margaret J. Wheatley
</blockquote>
        `,
      },
      {
        title: 'Collaboration',
        description: `Collaborative leaders, <a href="https://hbr.org/2011/07/are-you-a-collaborative-leader">according to Harvard Business Review</a>, regularly seek out a diversity of opinions and ideas among teammates to build strategies and solve problems. As a result, employees are more engaged, feel trusted and are more likely to take ownership of their work. Through collaborative leadership, managers and executives can create an inclusive environment that energises teams, releases creativity, and cultivates a work culture that is both productive and joyful.`,
      },
      {
        title: 'Compassion',
        description: `Harvard Business Review encourages leaders to <a href="https://hbr.org/2021/12/connect-with-empathy-but-lead-with-compassion">"Connect with Empathy, But Lead with Compassion"</a>. Compassion occurs when we take a step away from empathy and ask ourselves what we can do to support the person who is suffering. In this way, compassion is an intention versus an emotion. As leaders, empathy may cloud our judgment, encourage bias, and make us less effective at making wise decisions. However, it should not be completely avoided. A leader without empathy is like an engine without a spark plug — it simply won't engage. Empathy is essential for connection and then we can leverage the spark to lead with compassion. And, herein lies the challenge for most leaders: we tend to get trapped by our empathy, making us unable to shift to compassion.`,
      },
      {
        title: 'Courage',
        description: `Bold, confident leadership can help drive organisations forward and create growth, something that is undeniably positive. Courageous leaders lead their organisations in authentic and sustainable ways. They stick to their principles, are willing to innovate, take risks, make changes and won't walk away when times get tough or things are difficult.`,
      },
      {
        title: 'Diversity',
        description: `
<p>
  Diversity includes all the ways in which people differ, encompassing the different characteristics that make one individual or group different from another. While diversity is often used in reference to race, ethnicity, and gender, we embrace a broader definition of diversity that also includes age, national origin, religion, disability, sexual orientation, socioeconomic status, education, marital status, language, and physical appearance. Our definition also includes diversity of thought: ideas, perspectives, and values. We also recognize that individuals affiliate with multiple identities.<br>
  <ul>
    <li><a href="https://www.forbes.com/sites/eriklarson/2017/09/21/new-research-diversity-inclusion-better-decision-making-at-work/?sh=5930a25c4cbf">Forbes.com research</a> found that <blockquote>"inclusive teams make better decisions 87% of the time and do so faster with fewer meetings."</blockquote></li>
    <li><a href="https://www.mckinsey.com/featured-insights/diversity-and-inclusion/diversity-wins-how-inclusion-matters">McKinsey and Company research</a> found that <blockquote>"companies in the top quartile for gender diversity on executive teams were 25 percent more likely to have above-average profitability than companies in the fourth quartile"</blockquote></li>
    <li>McKinsey and Company also found that:
      <blockquote>
        "Companies with more than 30 percent women executives were more likely to outperform companies where this percentage ranged from 10 to 30, and in turn these companies were more likely to outperform those with even fewer women executives, or none at all."
      </blockquote>
    </li>
  </ul>
</p>
        `,
      },
      {
        title: 'Equity',
        description: `Equity is the fair treatment, access, opportunity, and advancement for all people, while at the same time striving to identify and eliminate barriers that have prevented the full participation of some groups. Improving equity involves increasing justice and fairness within the procedures and processes of institutions or systems, as well as in their distribution of resources. Tackling equity issues requires an understanding of the root causes of outcome disparities within our society.`,
      },
      {
        title: 'Free',
        description: `This content is completely free, though "Sponsorship" is another value of ours. Building on top of the principles of <a href="https://opensource.org/">free, open-source software</a> and the mission of <a href="https://creativecommons.org/">Creative Commons</a> to "overcome legal obstacles to the sharing of knowledge and creativity".`,
      },
      {
        title: 'Inclusion',
        description: `Inclusion is the act of creating environments in which any individual or group can be and feel welcomed, respected, supported, and valued to fully participate. An inclusive and welcoming climate embraces differences and offers respect in words and actions for all people. It's important to note that while an inclusive group is by definition diverse, a diverse group isn't always inclusive. Increasingly, recognition of unconscious or 'implicit bias' helps organizations to be deliberate about addressing issues of inclusivity.`,
      },
      {
        title: 'Integrity',
        description: `"The supreme quality for leadership is unquestionably integrity. Without it, no real success is possible, whether it is on a section gang, a football field, in an army, or in an office." &mdash; Dwight D. Eisenhower`,
      },
      {
        title: 'Quality',
        description: `
<p>
  The <a href="https://www.iso.org/files/live/sites/isoorg/files/store/en/PUB100080.pdf">ISO's "seven quality management principles"</a> outline the principles of quality management as:
</p>
<ol>
  <li>Customer focus</li>
  <li>Leadership</li>
  <li>Engagement of people</li>
  <li>Process approach</li>
  <li>Improvement</li>
  <li>Evidence-based decision making</li>
  <li>Relationship management</li>
</ol>
        `,
      },
      {
        title: 'Respect',
        description: `
<p>
  <a href="https://legacycultures.com/how-to-lead-better-by-connecting-with-respect/">Legacy Business Cultures teaches this simply</a> as "Great leaders make us feel connected, respected and capable."
</p>
<ol>
  <li>Focus on psychological safety</li>
  <li>Value and esteem your people</li>
  <li>Take time to provide perspective</li>
  <li>Encourage work-life balance</li>
  <li>Recognize contributions</li>
  <li>Practice fairness and equity</li>
  <li>Continually improve your self-awareness</li>
</ol>
        `,
      },
      {
        title: 'Self-awareness',
        description: `
<p>
  <blockquote>
    "A key to better leadership; self-awareness is crucial for evolving and finding coping strategies for weaknesses."<br>
    &mdash; Indra Nooyi, PepsiCo CEO
  </blockquote>
  Read more on <a href="https://sloanreview.mit.edu/article/self-awareness-a-key-to-better-leadership/">this MIT Sloan Management Review article</a>.
</p>
        `,
      },
      {
        title: 'Recognition',
        description: `
<p>
  It is no surprise that a platform Software as a Service offering for Employee Recognition like Achievers would claim that <a href="https://www.achievers.com/blog/why-leaders-need-to-be-recognition-champions/">"Leaders need to be recognition champions"</a> and reinforce it with the belief that "What gets recognized gets repeated."
  Most large to mid-size Enterprises have a recognition platform in place for their employees.<br>
  <br>
  Achievers suggests leaders take these steps to become a Recognition Champion:
  <ol>
    <li>Employee recognition will prove most effective when given in real-time and on a frequent basis.</li>
    <li>Advocate for a culture of recognition and start leading by example.</li>
    <li>Leverage both monetary and social recognition.</li>
    <li>Implement a recognition and rewards platform at your company so that every recognition sent gets company-wide attention.</li>
    <li>Celebrate anniversaries, birthdays, and general accomplishments with team-signed digital cards.</li>
    <li>Host quarterly R&R company-wide meetings to spotlight top performers.</li>
    <li>Take advantage of one-click recognitions so that no leader can use the excuse that they are “too busy” to recognize employees.</li>
  </ol>
</p>
        `,
      },
      {
        title: 'Sponsorship',
        description: `
<blockquote>
  "A sponsor is someone who also talks about you as your active advocate. A mentor is someone who contributes to your development. A sponsor is a leader who is committed to your advancement."<br>
  &mdash; Leadership Research Institute, <a href="https://www.lri.com/resources/useletter/whos-leadership-sponsor/">"Who's Your Leadership Sponsor"</a>
</blockquote>
        `,
      },
      {
        title: 'Transparency',
        description: `
According to <a href="https://www.apa.org/news/press/releases/2014/04/employee-distrust">a 2014 survey conducted by American Psychological Association titled "Employee Distrust is Pervasive in U.S. Workforce"</a>, only 52% of respondents reported believing their boss is straightforward and open with them. Transparency doesn't mean oversharing negative information with your teams. Nor is it a workplace confessional where you air out the laundry list of your professional shortcomings. Instead, transparency is a commitment to honesty and genuine engagement with your teams. Why is it beneficial to lead with transparency? Leaders willing to develop a culture of transparency in their company open up a host of potential benefits. Transparency leads to higher levels of trust, results in higher employee retention rates, and encourages the development of genuine relationships at work.
        `,
      },
    ];

    let isSelectedValueVisibleRef = ref(false);
    let selectedValueRef : Ref<OurValue> = ref(values[0]);

    return {
      describeSelectedValue: (value: OurValue) => {
        selectedValueRef.value = value;
        isSelectedValueVisibleRef.value = true;
      },
      values,
      isSelectedValueVisible: isSelectedValueVisibleRef,
      toggleSelectedValueVisible: (state: boolean) => {
        isSelectedValueVisibleRef.value = state;
      },
      selectedValue: selectedValueRef,
    };
  },
});
</script>

<style>
ion-card-title {
  font-size: 1.8em;
}

ion-chip {
  font-size: 1.3em;
}

.value-description ul:last-of-type {
  margin-bottom: 50px;
}

.value-description blockquote {
  margin-left: 5px;
}
</style>
