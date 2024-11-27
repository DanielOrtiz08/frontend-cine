import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ErrorcitoComponent } from './componentes/errorcito/errorcito.component';
import { IniciarsesionComponent } from './componentes/iniciarsesion/iniciarsesion.component';
import { RegistrarseComponent } from './componentes/registrarse/registrarse.component';
import { Error404Component } from './componentes/error404/error404.component';
import { ReservacionesComponent } from './componentes/reservaciones/reservaciones.component';
import { CartelerasComponent } from './componentes/carteleras/carteleras.component';
import { FuncionesComponent } from './componentes/funciones/funciones.component';
import { ConfiteriasComponent } from './componentes/confiterias/confiterias.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { GetAllClientesComponent } from './componentes/get-all-clientes/get-all-clientes.component';
import { AgregarClienteComponent } from './componentes/agregar-cliente/agregar-cliente.component';
import { EliminarClienteComponent } from './componentes/eliminar-cliente/eliminar-cliente.component';
import { ActualizarClienteComponent } from './componentes/actualizar-cliente/actualizar-cliente.component';

export const routes: Routes = [
    { path: 'home', component: InicioComponent },
    { path: 'confiteria', component: ConfiteriasComponent },
    { path: 'login',component:IniciarsesionComponent},
    { path: 'register',component:RegistrarseComponent},
    { path: 'rre',component:Error404Component},
    { path: 'reservation', component:ReservacionesComponent},
    { path: 'carteleras', component:CartelerasComponent},
    { path: 'funciones', component:FuncionesComponent},
    { path: 'clients', component: ClientesComponent, children: [
        { path: 'getallclients', component: GetAllClientesComponent}, // Subruta para ver la lista de clientes
        { path: 'addCliente', component: AgregarClienteComponent},
        {path: 'deleteCliente', component: EliminarClienteComponent},
        {path: 'updateCliente', component: ActualizarClienteComponent},
      ] 
    },
    

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: ErrorcitoComponent }
];
