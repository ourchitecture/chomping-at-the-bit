<template>
  <ion-grid class="business-canvas">
    <ion-row>
      <ion-col size="2" class="content">
        <h2>Key Partners <ion-icon :icon="link" class="ion-float-right"></ion-icon></h2>
        <ul>
          <li>Who are our Key Partners?</li>
          <li>Who are our Key Suppliers?</li>
          <li>Which Key Resources are we acquiring from partners?</li>
          <li>Which Key Activities do partners perform?</li>
        </ul>
        <h3>Motivations for Partnerships</h3>
        <ul>
          <li>Optimization and economy</li>
          <li>Reduction of risk and uncertainty</li>
          <li>Acquisition of particular resources and activites</li>
        </ul>
      </ion-col>
      <ion-col size="2">
        <ion-grid class="internal">
          <ion-row>
            <ion-col class="content">
              <h2>Key Activities <ion-icon title="Key Activities" aria-label="Key Activities" :icon="checkbox" class="ion-float-right"></ion-icon></h2>
              <ul>
                <li>What Key Activities do our Value Propositions require?</li>
                <li>Our Distribution Channels?</li>
                <li>Customer Relationships?</li>
                <li>Revenue Streams?</li>
              </ul>
              <h3>Categories</h3>
              <ul>
                <li>Production</li>
                <li>Problem Solving</li>
                <li>Platform/Network</li>
              </ul>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="content">
              <h2>Key Resources <ion-icon title="Key Resources" src="/assets/icon/business-model-canvas/key-resources_dark.svg" class="ion-float-right"></ion-icon></h2>
              <ul>
                <li>What Key Activities do our Value Propositions require?</li>
                <li>Our Distribution Channels?</li>
                <li>Customer Relationships?</li>
                <li>Revenue Streams?</li>
              </ul>
              <h3>Categories</h3>
              <ul>
                <li>Production</li>
                <li>Problem Solving</li>
                <li>Platform/Network</li>
              </ul>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-col>
      <ion-col size="2" class="content">
        <h2>Value Propositions <ion-icon title="Value Propositions" :icon="gift" class="ion-float-right"></ion-icon></h2>
        <ul>
          <li>What value do we deliver to the customer?</li>
          <li>Which one of our customer's problems are we helping to solve?</li>
          <li>What bundles of products and services are we offering to each Customer Segment?</li>
          <li>Which customer needs are we satisfying?</li>
        </ul>
        <h3>Characteristics</h3>
        <ul>
          <li>Newness</li>
          <li>Performance</li>
          <li>Customization</li>
          <li>"Getting the Job Done"</li>
          <li>Design</li>
          <li>Brand / Status</li>
          <li>Price</li>
          <li>Cost Reduction</li>
          <li>Risk Reduction</li>
          <li>Accessibility</li>
          <li>Convenience / Usability</li>
        </ul>
      </ion-col>
      <ion-col size="2">
        <ion-grid class="internal">
          <ion-row>
            <ion-col class="content">
              <h2>Customer Relationships <ion-icon title="Customer Relationships" :icon="heart" class="ion-float-right"></ion-icon></h2>
              <ul>
                <li>What type of relationship does each of our Customer Segments expect us to establish and maintain with them?</li>
                <li>Which ones have we established?</li>
                <li>How are they integrated with the rest of our business model?</li>
                <li>How costly are they?</li>
              </ul>
              <h3>Examples</h3>
              <ul>
                <li>Personal assistance</li>
                <li>Dedicated Personal Assistance</li>
                <li>Self-Service</li>
                <li>Automated Services</li>
                <li>Communities</li>
                <li>Co-creation</li>
              </ul>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="content">
              <h2>Channels <ion-icon title="Channels" src="/assets/icon/business-model-canvas/channels_dark.svg" class="ion-float-right"></ion-icon></h2>
              <ul>
                <li>Through which Channels do our Customer Segments want to be reached?</li>
                <li>How are we reaching them now?</li>
                <li>How are our Channels integrated?</li>
                <li>Which ones work best?</li>
                <li>Which ones are most cost-efficient?</li>
                <li>How are we integrating them with customer routines?</li>
              </ul>
              <h3>Channel Phases</h3>
              <dl>
                <dt>Awareness</dt>
                <dd>How do we raise awareness about our company's products and services?</dd>
                <dt>Evaluation</dt>
                <dd>How do we help customers evaluate our organization's Value Proposition?</dd>
                <dt>Purchase</dt>
                <dd>How do we allow customers to purchase specific products and services?</dd>
                <dt>Delivery</dt>
                <dd>How do we deliver a Value Proposition to customers?</dd>
                <dt>After sales</dt>
                <dd>How do we provide post-purchase customer support?</dd>
              </dl>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-col>
      <ion-col size="2" class="content">
        <h2>Customer Segments <ion-icon title="Customer Segments" :icon="people" class="ion-float-right"></ion-icon></h2>
        <ul>
          <li>For whom are we creating value?</li>
          <li>Who are our most important customers?</li>
        </ul>
        <ul>
          <li>Mass Market</li>
          <li>Niche Market</li>
          <li>Segmented</li>
          <li>Diversified</li>
          <li>Multi-sided Platform</li>
        </ul>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col size="5" class="content">
        <h2>Cost Structure <ion-icon title="Cost Structure" :icon="pricetags" class="ion-float-right"></ion-icon></h2>
        <ul>
          <li>What are the most important costs inherent in our business model?</li>
          <li>Which Key Resources are most expensive?</li>
          <li>Which Key Activities are most expensive?</li>
        </ul>
        <h3>Is Your Business More</h3>
        <ul>
          <li>Cost-Driven (leanest cost structure, low price value proposition, maximum automation, extensive outsourcing)</li>
          <li>Value-Driven (focused on value creation, premium value proposition)</li>
        </ul>
        <h3>Sample Characteristics</h3>
        <ul>
          <li>Fixed Costs (salaries, rents, utilities)</li>
          <li>Variable costs</li>
          <li>Economies of scale</li>
          <li>Economies of scope</li>
        </ul>
      </ion-col>
      <ion-col size="5" class="content">
        <h2>Revenue Streams <ion-icon title="Revenue Streams" src="/assets/icon/business-model-canvas/revenue-streams_dark.svg" class="ion-float-right"></ion-icon></h2>
        <ul>
          <li>For what value are our customers really willing to pay?</li>
          <li>For what do they currently pay?</li>
          <li>How are they currently paying?</li>
          <li>How would they prefer to pay?</li>
          <li>How much does each Revenue Stream contribute to overall revenues?</li>
        </ul>
        <ion-grid>
          <ion-row>
            <ion-col>
              <h3>Types</h3>
              <ul>
                <li>Asset sale</li>
                <li>Usage fee</li>
                <li>Subscription Fees</li>
                <li>Lending / Renting / Leasing</li>
                <li>Licensing</li>
                <li>Brokerage fees</li>
                <li>Advertising</li>
              </ul>
            </ion-col>
            <ion-col>
              <h3>Fixed Pricing</h3>
              <ul>
                <li>List Price</li>
                <li>Product feature dependent</li>
                <li>Customer segment dependent</li>
                <li>Volume dependent</li>
              </ul>
            </ion-col>
            <ion-col>
              <h3>Dynamic Pricing</h3>
              <ul>
                <li>Negotation (bargaining)</li>
                <li>Yield Management</li>
                <li>Real-time-Market</li>
              </ul>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import {
  IonCol,
  IonIcon,
  IonGrid,
  IonRow,
} from '@ionic/vue';
import {
  checkbox,
  gift,
  heart,
  link,
  people,
  pricetags,
} from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OurBusinessCanvas',
  components: {
    IonCol,
    IonIcon,
    IonGrid,
    IonRow,
  },
  setup() {
    return {
      checkbox,
      gift,
      heart,
      link,
      people,
      pricetags,
    }
  }
});
</script>

<style scoped>

* {
  font-size: 1em;
}

h2 {
  font-size: 1.3em;
}

h3 {
  font-size: 1.2em;
}

dl {
  list-style-type: disc;
  list-style-position: inside;
}

dt {
  display: list-item;
}

dd {
  margin: 0 0 0 1em;
}

ion-grid.business-canvas {
  --ion-grid-columns: 10;
  --ion-grid-padding: 5px;
}

ion-grid.business-canvas ion-col {
  --ion-grid-column-padding: 0;
}

ion-grid.business-canvas ion-col.content {
  padding: 0 15px;
  border: 1px solid white;
}

ion-grid.internal {
  height: 100%;
  display: flex;
  flex-flow: column;
  --ion-grid-padding: 0;
}

ion-grid.internal ion-row {
  height: 100%;
}

ion-grid.internal ion-col {
  --ion-grid-column-padding: 0;
}

</style>
