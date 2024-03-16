import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';


import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProvinceComponent } from './agences/Province-manager/province/province.component';
import { ZoneComponent } from './agences/Zone-manager/zone/zone.component';
import { ProvinceService } from './services/Province.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MotifService } from './services/MotifService.service';
import { AddProvinceComponent } from './agences/Province-manager/add-province/add-province.component';
import { UpdateProvinceComponent } from './agences/Province-manager/update-province/update-province.component';
import { ZoneService } from './services/Zone.service';
import { AddZoneComponent } from './agences/Zone-manager/add-zone/add-zone.component';
import { UpdateZoneComponent } from './agences/Zone-manager/update-zone/update-zone.component';
import { DeposeurComponent } from './deposeur/Deposeur-manager/deposeur/deposeur.component';
import { AddDeposeurComponent } from './deposeur/Deposeur-manager/add-deposeur/add-deposeur.component';
import { UpdateDeposeurComponent } from './deposeur/Deposeur-manager/update-deposeur/update-deposeur.component';
import { DeposeurService } from './services/Deposeur.service';
import { DepotComponent } from './depot/depot-manager/depot/depot.component';
import { DepotService } from './services/Depot.service';
import { UpdateDepotComponent } from './depot/depot-manager/update-depot/update-depot.component';
import { EtatComponent } from './etat/etat-manager/etat/etat.component';
import { EtatService } from './services/Etat.service';
import { RetourComponent } from './etat/retour-manager/retour/retour.component';
import { RetourService } from './services/Retour.service';
import { LivreeComponent } from './etat/livree-manager/livree/livree.component';
import { LivreeService } from './services/Livree.service';
import { RapportComponent } from './rapport/rapport-manager/rapport/rapport.component';
import { RapportService } from './services/Rapport.service';
import { HeaderComponent } from './header/header.component';
import {DataTablesModule} from 'angular-datatables';
import { DepotAgenceComponent } from './depot_agence/depot_agence-manager/depot-agence/depot-agence.component'
import { Depot_agenceService } from './services/Depot_agence.service';
import { Depot_provinceService } from './services/Depot_province.service';

import { DepotProvinceComponent } from './depot_province/depot_province-manager/depot-province/depot-province.component';
import { AddDepotAgenceComponent } from './depot_agence/depot_agence-manager/add-depot-agence/add-depot-agence.component';
import { DepotByZoneComponent } from './depot-by-zone/depot-by-zone.component';
import { DonutPieComponent } from './charts/donut-pie/donut-pie.component';
import { ComboPieComponent } from './charts/combo-pie/combo-pie.component';
import { PieComponent } from './charts/pie/pie.component';
import { RadarComponent } from './charts/radar/radar.component';
import { RapportProvinceComponent } from './rapport/rapport-manager/rapport-province/rapport-province.component';
import { RapportZoneComponent } from './rapport/rapport-manager/rapport-zone/rapport-zone.component';
import { RadialBarEtatComponent } from './charts/radial-bar-etat/radial-bar-etat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';



import { SemicirclePieLivreeComponent } from './charts/semicircle-pie-livree/semicircle-pie-livree.component';
import { SemicirclePieRetourComponent } from './charts/semicircle-pie-retour/semicircle-pie-retour.component';
import { RapportAgenceComponent } from './rapport/rapport-manager/mois/rapport-agence/rapport-agence.component';
import { RapportMensuelProvinceComponent } from './rapport/rapport-manager/mois/rapport-mensuel-province/rapport-mensuel-province.component';
import { RapportMensuelZoneComponent } from './rapport/rapport-manager/mois/rapport-mensuel-zone/rapport-mensuel-zone.component';
import { RapportSemaineAgenceComponent } from './rapport/rapport-manager/semaine/rapport-semaine-agence/rapport-semaine-agence.component';
import { RapportSemaineProvinceComponent } from './rapport/rapport-manager/semaine/rapport-semaine-province/rapport-semaine-province.component';
import { RapportSemaineZoneComponent } from './rapport/rapport-manager/semaine/rapport-semaine-zone/rapport-semaine-zone.component';
import { RapportQuinziemeAgenceComponent } from './rapport/rapport-manager/quinzieme/rapport-quinzieme-agence/rapport-quinzieme-agence.component';
import { RapportQuinziemeProvinceComponent } from './rapport/rapport-manager/quinzieme/rapport-quinzieme-province/rapport-quinzieme-province.component';
import { RapportQuinziemeZoneComponent } from './rapport/rapport-manager/quinzieme/rapport-quinzieme-zone/rapport-quinzieme-zone.component';
import { StrockedComponent } from './charts/strocked/strocked.component';
import { StrockedRetourComponent } from './charts/strocked-retour/strocked-retour.component';
import { StrockedInstanceComponent } from './charts/strocked-instance/strocked-instance.component';
import { LoginComponent } from './security/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthenticationGuard } from './security/guards/authentication.guard';
import { TokenInterceptorProvider } from './security/interceptor/token.interceptor';
import { AccountManagerComponent } from './security/account-manager/account-manager.component';
import { UdpateUserComponent } from './security/update-account/udpate-user/udpate-user.component';
import { RoleToUserComponent } from './security/update-account/role-to-user/role-to-user.component';
import { ProfileComponent } from './security/profile/profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MotifComponent } from './motif/motif/motif.component';
import { AddMotifComponent } from './motif/add-motif/add-motif.component';
import { UpdateMotifComponent } from './motif/update-motif/update-motif.component';
import { MoisComponent } from './rapport/rapport-manager/total-manager/mois/mois.component';
import { SemaineComponent } from './rapport/rapport-manager/total-manager/semaine/semaine.component';
import { QuinziemeComponent } from './rapport/rapport-manager/total-manager/quinzieme/quinzieme.component';
registerLocaleData(localeFr,'fr');




const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent},
  { path:'sps', component:AdminTemplateComponent, canActivate:[AuthenticationGuard], 
    children:[
      { path: 'motif', component: MotifComponent},
      { path: 'motif/add', component: AddMotifComponent},
      { path: 'motif/update/:nomMotif/:idMotif', component: UpdateMotifComponent},
      { path: 'agences/province', component: ProvinceComponent },
      { path: 'agences/zone/:codeProvince', component: ZoneComponent },
      { path: 'agences/province/add',component: AddProvinceComponent },
      { path: 'agences/province/update/:nomProvince/:codeProvince',component: UpdateProvinceComponent },
      { path: 'agences/zone/add/:codeProvince', component: AddZoneComponent},
      { path: 'agences/zone/update/:nomZone/:idZone/:codeProvince', component: UpdateZoneComponent},
      { path: 'deposeur', component: DeposeurComponent},
      { path: 'deposeur/add', component: AddDeposeurComponent},
      { path: 'deposeur/update/:nomDeposeur/:idDeposeur', component: UpdateDeposeurComponent},
      { path: 'depot/:nbDepotagence/:idDepotprovince/:idDepotagence', component: DepotComponent},
      { path: 'depot/update/:nbDepot/:idDepot/:idDepotProvince', component: UpdateDepotComponent},
      { path: 'etat/:nbDepotagence/:nbDepotprovince/:idDepot/:idDepotprovince/:idDepotagence', component: EtatComponent},
      { path: 'retour/:nbDepotagence/:nbDepotprovince/:idDepot/:idDepotprovince/:idDepotagence', component: RetourComponent},
      { path: 'livree/:nbDepotagence/:nbDepotprovince/:idDepot/:idDepotprovince/:idDepotagence', component: LivreeComponent},
      { path: 'rapport/annuel', component:RapportComponent},
      { path: 'depotagence', component: DepotAgenceComponent},
      { path: 'depotagence/add', component: AddDepotAgenceComponent},
      { path: 'depotprovince/:idDepotAgence', component: DepotProvinceComponent},
      { path: 'depotbyzone/:idZone/:nomProvince', component: DepotByZoneComponent},
      { path: 'dashboard',component: PieComponent},
      { path: 'rapport/province/:idDepotagence', component: RapportProvinceComponent},
      { path: 'rapport/zone/:nbDepotagence/:idDepotprovince', component:RapportZoneComponent},
      { path: 'rapport/mois/agence/:idDepotagence', component: RapportAgenceComponent},
      { path: 'rapport/mois/province/:nbDepotagence/:idDepotprovince', component: RapportMensuelProvinceComponent},
      { path: 'rapport/mois/zone/:nbDepotagence/:nbDepotprovince/:idDepot', component: RapportMensuelZoneComponent},
      { path: 'rapport/semaine/agence/:idDepotagence', component: RapportSemaineAgenceComponent},
      { path: 'rapport/semaine/province/:nbDepotagence/:idDepotprovince', component: RapportSemaineProvinceComponent},
      { path: 'rapport/semaine/zone/:nbDepotagence/:nbDepotprovince/:idDepot', component: RapportSemaineZoneComponent},
      { path: 'rapport/quinzieme/agence/:idDepotagence', component: RapportQuinziemeAgenceComponent},
      { path: 'rapport/quinzieme/province/:nbDepotagence/:idDepotprovince', component: RapportQuinziemeProvinceComponent},
      { path: 'rapport/quinzieme/zone/:nbDepotagence/:nbDepotprovince/:idDepot', component: RapportQuinziemeZoneComponent},
      { path: 'account', component: AccountManagerComponent},
      { path: 'account/update/:userName/:id', component: UdpateUserComponent},
      { path: 'account/role/:idUser', component: RoleToUserComponent},
      { path: 'rapport/mois/total/:annee/:DepotPartenaireTotal', component: MoisComponent},
      { path: 'rapport/semaine/total/:annee/:DepotPartenaireTotal', component: SemaineComponent},
      { path: 'rapport/quinzieme/total/:annee/:DepotPartenaireTotal', component: QuinziemeComponent},
  ]}
 
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ProvinceComponent,
    ZoneComponent,
    AddProvinceComponent,
    UpdateProvinceComponent,
    AddZoneComponent,
    UpdateZoneComponent,
    DeposeurComponent,
    AddDeposeurComponent,
    UpdateDeposeurComponent,
    DepotComponent,
    UpdateDepotComponent,
    EtatComponent,
    RetourComponent,
    LivreeComponent,
    RapportComponent,
    SidebarComponent,
    HeaderComponent,
    DepotAgenceComponent,
    AddDepotAgenceComponent,
    DepotProvinceComponent,
    DepotByZoneComponent,
    DonutPieComponent,
    ComboPieComponent,
    PieComponent,
    RadarComponent,
    RapportProvinceComponent,
    RapportZoneComponent,
    RadialBarEtatComponent,
    SemicirclePieLivreeComponent,
    SemicirclePieRetourComponent,
    RapportAgenceComponent,
    RapportMensuelProvinceComponent,
    RapportMensuelZoneComponent,
    RapportSemaineAgenceComponent,
    RapportSemaineProvinceComponent,
    RapportSemaineZoneComponent,
    RapportQuinziemeAgenceComponent,
    RapportQuinziemeProvinceComponent,
    RapportQuinziemeZoneComponent,
    StrockedComponent,
    StrockedRetourComponent,
    StrockedInstanceComponent,
    LoginComponent,
    AdminTemplateComponent,
    AccountManagerComponent,
    UdpateUserComponent,
    RoleToUserComponent,
    ProfileComponent,
    MotifComponent,
    AddMotifComponent,
    UpdateMotifComponent,
    MoisComponent,
    SemaineComponent,
    QuinziemeComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    DataTablesModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDividerModule,
    MatMenuModule,
    MatExpansionModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule
    
      
  

    
  ],
  providers: [
  MotifService,
	ProvinceService,
	ZoneService,
  DeposeurService,
  DepotService,
  EtatService,
  RetourService,
  LivreeService,
  RapportService,
  Depot_agenceService,
  Depot_provinceService,
  AuthenticationService,
  TokenInterceptorProvider,
  {provide:LOCALE_ID, useValue:"fr-FR"}
],

  bootstrap: [AppComponent]
})
export class AppModule { }
