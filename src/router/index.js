import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import ScheduleComponent from "../public/pages/schedule.component.vue";
import ClientServicesComponent from "../service-management/pages/client-services.component.vue";
import ClientServiceDetailComponent from "../service-management/pages/client-service-detail.component.vue";
import BusinessServicesComponent from "../service-management/pages/business-services.component.vue";
import CreateBusinessServiceComponent from "../service-management/pages/create-business-service.component.vue";
import ServiceAppointmentComponent from "../service-management/pages/service-appointment.component.vue";
import HistoryPageComponent from "../appointment-management/pages/history-page.component.vue";
import PageNotFound from "../public/pages/page-not-found.vue";
import CompanyDetailPageComponent   from "../company-detail/pages/company-detail-page.component.vue";
import BusinessAppointmentListComponent from "../appointment-management/components/business-appointment-list.component.vue";
import ReviewManagementPage from '../review/pages/review-management-page.component.vue';
import EditBusinessServiceComponent from "../service-management/pages/edit-business-service.component.vue";
import ReservationsComponent from "../appointment-management/pages/reservations-page.component.vue";

export const defaultClientId = 1;
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
        {path: '/review/:appointmentId', name: 'ReviewManagementPage', component: ReviewManagementPage, props: true},

        { path: '/business-my-services/:id', name: 'BusinessMyServices', component: BusinessServicesComponent, meta: { title: 'My Services' }, props: route => ({ id: route.params.id || defaultBusinessId }) },
        { path: '/homeBusiness', name: 'BusinessHome', component: CompanyDetailPageComponent, meta: { title: 'Home' } },
        { path: '/service-management/edit-service/:serviceId', name: 'ServiceEdit', component: EditBusinessServiceComponent, meta: { title: 'Edit Service' }, props: true },
        { path: '/business-service-management/create-service', name:'Create Service', component: CreateBusinessServiceComponent, meta:{title:'Create Service'}},
        { path: '/business-schedule/:id?', name: 'BusinessSchedule', component: PageNotFound, meta: { title: 'Schedule' }, props: route => ({ id: route.params.id || defaultBusinessId }) },
        { path:'/service-appointment', name:'Service Appointment', ServiceAppointmentComponent, meta:{title:'Service Appointment'} },
        { path: '/business-schedule/:id?', name: 'BusinessSchedule', component: BusinessAppointmentListComponent, meta: { title: 'Schedule' }, props: route => ({ id: route.params.id || defaultBusinessId }) },
       

        // Redirection options
        { path: '/', redirect: '/home' },
        { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound, meta: { title: 'Page Not Found' } },
        {path: '/reservation/:id', name: 'Reservations', component: ReservationsComponent, meta: { title: 'Reservations' } },
    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'Bliss';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;