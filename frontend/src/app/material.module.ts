import { NgModule, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    imports: [MatButtonModule, MatToolbarModule, MatCardModule, MatFormFieldModule, FlexLayoutModule, MatInputModule, MatIconModule, MatMenuModule, MatTabsModule, MatSidenavModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatCheckboxModule, MatSnackBarModule],
    exports: [MatButtonModule, MatToolbarModule, MatCardModule, MatFormFieldModule, FlexLayoutModule, MatInputModule, MatIconModule, MatMenuModule, MatTabsModule, MatSidenavModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatCheckboxModule, MatSnackBarModule],
})
export class MyMaterialModule {

}