import { Component, OnInit, ViewChild,AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Grafico } from 'src/app/models/grafico';
import {HttpClient} from '@angular/common/http';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableModule} from '@angular/material/table';
import { Sucursal } from 'src/app/models/sucursal';
@Component({
  selector: 'app-estadisticos',
  templateUrl: './estadisticos.component.html',
  styleUrls: ['./estadisticos.component.css']
})
export class EstadisticosComponent  implements OnInit {
@ViewChild(MatPaginator) paginator: MatPaginator;
obs: Observable<any>;
categorias:any[]=[];
sucursal:Sucursal
meses=['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE']
dataSource: MatTableDataSource<any>
pie=0;
fecha:Date
gestion:number[]=[]
mostrar=false;
view: any[] = [700, 300];
single:Grafico[] = [];
colores=[];
cate=[];
// options
gradient: boolean = true;
showLegend: boolean = true;
showLabels: boolean = true;
isDoughnut: boolean = false;
legendPosition: string = 'below';
showXAxis = true;
showYAxis = true;
showXAxisLabel = true;
xAxisLabel = 'Colegios';
showYAxisLabel = true;
yAxisLabel = 'Cantidad';
constructor(
  private venta:VentaService,
  private changeDetectorRef: ChangeDetectorRef
) { }
seleccionarGestion(gestion:number){
  this.mostrar=true
  this.categorias=[];
  this.sucursal={id:1,direccion:'',imagen:'',numero:0}
  this.venta.meses(this.sucursal.id,gestion).subscribe(data=>{
    let t=0
    data.forEach(fila => {
      this.single=[];
      fila.forEach(value=>{
        this.single.push(value);
      })
      let valorMeses={'valor':this.single,'mes':this.meses[t]}
      t++
      this.categorias.push(valorMeses)
    });
    this.dataSource= new MatTableDataSource<any>(this.categorias);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  });
}
  ngOnInit(): void {
    let i=2022
    while(i<2029){
      this.gestion.push(i++)
    }
  }

}

