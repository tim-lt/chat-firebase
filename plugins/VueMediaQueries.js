import Vue from 'vue'; // eslint-disable-line
import VueMq from 'vue-mq';

Vue.use(VueMq, {
  breakpoints: {
    phone: 430,
    'phone-wide': 600,
    tablet: 920,
    'tablet-wide': 1250,
    desktop: 1750,
    'desktop-wide': 2200,
    screen: Infinity,
  },
});
