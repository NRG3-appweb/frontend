import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import ScheduleComponent from "../public/pages/schedule.component.vue";
import ClientServicesComponent from "../service-management/pages/client-services.component.vue";
import ClientServiceDetailComponent from "../service-management/pages/client-service-detail.component.vue";
import BusinessServicesComponent from "../service-management/pages/business-services.component.vue";
import CreateBusinessServiceComponent from "../service-management/components/create-business-service.component.vue";
import ServiceAppointmentComponent from "../service-management/pages/service-appointment.component.vue";
import HistoryPageComponent from "../history/pages/history-page.component.vue";
import PageNotFound from "../public/pages/page-not-found.vue";
import CompanyDetailPageComponent   from "../company-detail/pages/company-detail-page.component.vue";
const defaultClientId = 1;
export const defaultBusinessId = 1;

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // General options

        // Client options
        // { path: '/schedule/:userId', name: 'ClientSchedule', component: ScheduleComponent, meta: { title: 'Schedule' }, props: route => ({ userId: route.params.userId || defaultClientId }) },
        { path: '/home', name: 'ClientHome', component: HomeComponent, meta: { title: 'Home' } },
        { path: '/client-services', name: 'ClientServices', component: ClientServicesComponent, meta: { title: 'Services' } },
        { path: '/service-management/:id', name: 'Service', component: ClientServiceDetailComponent, meta: { title: 'ServiceDetail' } },
        { path: '/schedule/:userId', name: 'ClientSchedule', component: ScheduleComponent, meta: { title: 'Schedule' } },
        { path: '/client-myservices/:id?', name: 'ClientMyServices', component: HistoryPageComponent, meta: { title: 'My Services' }, props: route => ({ id: route.params.id || defaultClientId }) },
        {path:'/service-appointment', name:'Service Appointment', ServiceAppointmentComponent, meta:{title:'Service Appointment'} },

        // Business options
        //{ path: '/business-service-management/create-service/:id', name: 'CreateService', component: CreateBusinessServiceComponent, meta: { title: 'Create Service' } },
        { path: '/business-my-services/:id?', name: 'BusinessMyServices', component: BusinessServicesComponent, meta: { title: 'My Services' }, props: route => ({ id: route.params.id || defaultBusinessId }) },
        { path: '/home', name: 'BusinessHome', component: CompanyDetailPageComponent, meta: { title: 'Home' } },
        //{ path: '/business-myservices', name:'BussinesMyServices', component: BusinessServicesComponent, meta:{title:'My Services'}},
        {path: '/business-service-management/create-service', name:'Create Service', component: CreateBusinessServiceComponent, meta:{title:'Create Service'}},
        { path: '/business-schedule/:id?', name: 'BusinessSchedule', component: PageNotFound, meta: { title: 'Schedule' }, props: route => ({ id: route.params.id || defaultBusinessId }) },
       

        // Redirection options
        { path: '/', redirect: '/home' },
        { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound, meta: { title: 'Page Not Found' } }
    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'Bliss';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;