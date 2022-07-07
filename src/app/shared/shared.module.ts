import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';




@NgModule({
    imports:[
        RouterModule,
        CommonModule
    ],
    declarations: [
        NopagefoundComponent,
        SidebarComponent,
        HeaderComponent
    ],
    exports:[
        NopagefoundComponent,
        SidebarComponent,
        HeaderComponent
    ]
  })

  export class sharedModule {}