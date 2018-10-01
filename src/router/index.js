import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import LandingPage from '@/components/LandingPage';
import Material from '@/components/Material';
import BeerNote from '@/components/BeerNote/BeerNote';
import Intro from '@/components/BeerNote/Intro/Intro';
import BeerInfo from '@/components/BeerNote/Intro/BeerInfo';
import PhotoVerification from '@/components/BeerNote/Intro/PhotoVerification';
import StyleSelection from '@/components/BeerNote/Intro/StyleSelection';
import Summary from '@/components/BeerNote/Intro/Summary';
import Loader from '@/components/BeerNote/Loader';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
    },
    {
      path: '/material',
      name: 'Material',
      component: Material,
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/beer/:noteId',
      name: 'BeerNote',
      component: BeerNote,
      props: true,
      children: [
        {
          path: 'intro',
          component: Intro,
        },
        {
          path: 'beerinfo',
          component: BeerInfo,
        },
        {
          path: 'photoverification',
          component: PhotoVerification,
        },
        {
          path: 'styleselection',
          component: StyleSelection,
        },
        {
          path: 'summary',
          component: Summary,
        },
        {
          path: '',
          component: Loader,
        },
      ],
    },
  ],
});
