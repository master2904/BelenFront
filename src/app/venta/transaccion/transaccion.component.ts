import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, of, startWith } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Historial } from 'src/app/models/historial';
import { Producto } from 'src/app/models/producto';
import { Sucursal } from 'src/app/models/sucursal';
import { Usuario } from 'src/app/models/usuario';
import { Venta } from 'src/app/models/venta';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { VentaService } from 'src/app/services/venta.service';
import { faCancel, faLeftLong,faRightLong, faDollar} from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environments.prod';
@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit{
  //iconos
  faCancel=faCancel
  faLeftLong=faLeftLong
  faRightLong=faRightLong
  faDollar=faDollar
  title = 'Producto';
  // formularios
  nombreProducto = new FormControl('');
  sucursales:Sucursal[]=[]
  filtroProducto:Observable<any[]> = of([]);
  filtro_productos: any[] = [];
  ventas:any[] =[];
  productos:Producto[]=[]
  matriz:Historial[]=[]
  usuario:Usuario={apellido:'',id:0,imagen:'',nombre:'',password:'',rol:0,username:''}
  formProducto:Producto
  formCliente:Cliente
  formVenta:Venta
  sucursal:Sucursal={id:0,direccion:'',imagen:'',numero:0}
  total=0
  vender=0
  sig=0
  base=environment.base
  constructor(
    private toastr: ToastrService,
    private dialog:MatDialog,
    private dialogo:MatDialog,
    private sucursalServicio:SucursalService,
    private productoServicio:ProductoService,
    private cliente:ClienteService,
    private ventaServicio:VentaService) {
    this.formProducto={} as Producto
    this.formCliente={} as Cliente
    this.formVenta={} as Venta
    this.filtroProducto = this.nombreProducto.valueChanges.pipe(startWith(''),
        // map(value => this._filter_producto(value || '')),
      map(state => (state ? this._filter_producto(state) : this.productos.slice())),
    );
  }
  nuevo= new FormGroup({
    nit: new FormControl(""),
    cantidad:new FormControl('',[Validators.required,Validators.min(1)]),
    producto_id:new FormControl('',Validators.required),
    producto: new FormControl(""),
    precio: new FormControl("",Validators.required),
    nombre: new FormControl("")    ,
  });
  get producto(){return this.nuevo.get('producto'); }
  get cantidad(){return this.nuevo.get('cantidad'); }
  get precio(){return this.nuevo.get('precio'); }
  get producto_id(){return this.nuevo.get('producto_id'); }
  ngOnInit(): void {
    this.sucursalServicio.listar().subscribe(data=>{
      this.sucursales=data
    })
  }
  llenar_imagen(img:string){
    return this.base+img;
  }
  mostrarProductos(item:Sucursal):void{
    this.matriz.splice(0,this.matriz.length)
    this.ventas.splice(0,this.ventas.length)
    this.sucursal=item
    console.log(this.sucursal)
    this.productoServicio.listarPorVenta(item.id).subscribe(data=>{
      this.productos=data
    })
  }
  private _filter_producto(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.productos.filter(option => (option.descripcion).toLowerCase().includes(filterValue));
  }
  get nombre(){return this.nuevo.get('nombre'); }
  get nit(){return this.nuevo.get('nit'); }

  seleccionarProducto(s:Producto){
    this.cantidad?.setValidators([Validators.required,Validators.max(s.stock)])
    this.cantidad?.updateValueAndValidity()
    this.formProducto.id=s.id;
    this.formProducto.descripcion=s.descripcion;
    this.formProducto.codigo=s.codigo;
    this.formProducto.stock=s.stock;
    this.formProducto.precio_compra=s.precio_compra;
    this.formProducto.precio_venta=s.precio_venta;
    this.nuevo.controls['producto_id'].setValue(s.id+"")
    this.nuevo.controls['producto'].setValue(s.descripcion)
    this.nuevo.controls['precio'].setValue(s.precio_venta+"")
    this.nuevo.controls['cantidad'].setValue(s.stock+"")
  }
  nuevo_producto(e:string){
      this.nuevo.controls['producto'].setValue(e)
  }
  carrito(){
    this.vender++
    let formHistorial:Historial = {
      cantidad:0,
      precio:0,
      producto_id:0,
      venta_id:0
    }
    formHistorial.cantidad= (this.cantidad?.value!= undefined)?(+(this.cantidad?.value)):0
    formHistorial.precio=(this.precio?.value!= undefined)?+(this.precio?.value):0
    formHistorial.subTotal=formHistorial.precio*formHistorial.cantidad;
    formHistorial.producto_id=(this.producto_id?.value!=undefined)?+(this.producto_id.value):0
    // this.total+=formHistorial.sub_total_venta
    let v=[];
    v.push(this.formProducto.codigo)
    v.push(this.formProducto.descripcion)
    v.push(formHistorial.cantidad)
    v.push(formHistorial.precio)
    v.push(formHistorial.subTotal)
    this.ventas.push(v);
    this.cantidad?.setValue('')
    this.precio?.setValue('')
    this.producto?.setValue('')
    this.nombreProducto.setValue('')
    this.matriz.push(formHistorial)
  }
  validar(e:number){
    // if(this.form.cantidad<e)
    //   this.nuevo.get('cantidad').setErrors({'max':this.form.cantidad})
  }
  error_cantidad(){
    if(this.cantidad?.hasError('required'))
      return "Campo Obligatorio";
    if(this.cantidad?.hasError("min"))
      return "Cantidad Invalida"
    if(this.cantidad?.hasError('max'))
      console.log(this.cantidad.status)
      return "Cantidad insuficiente en almacen";
    return "";
  }
  error_precio(){
    if(this.precio?.hasError('required'))
      return "Campo Obligatorio";
    return "";
  }
  error_producto(){
    if(this.producto?.hasError('required'))
      return "Campo Obligatorio";
    return "";
  }

  eliminar(pos:number){
  //   console.log(pos)
  //   this.dialogo.open(DialogoComponent, {
  //     data: `¿Desea quitar este Item?`
  //   })
  //   .afterClosed()
  //   .subscribe((confirmado: Boolean) => {
  //     if (confirmado) {
  //       this.total-=this.ventas[pos][4]
  //       this.ventas.splice(pos,1);
  //       this.matriz.splice(pos,1);
  //       this.toastr.warning('Item Removido')
  //     }
  //     else
  //       this.toastr.info('Operacion Cancelada');
  //   });
  }
  realizar_venta(){
    console.log(this.formCliente)
    let fecha:Date;
    fecha = new Date;
    let fecha1=""+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+(fecha.getDate());
    this.formVenta={
      id:0,
      cliente_id:this.formCliente.id,
      fecha:fecha,
      total:0,
      user_id:0,
    }
    let form={
      cliente:this.formCliente,
      venta:this.formVenta,
      historial:this.matriz
    }
    console.log(form)
    // let formulario_venta:Venta={id:0,id_cliente:+localStorage.getItem('n3'),id_usuario:+localStorage.getItem('data'),fecha:fecha1};
  //   console.log(this.f)
  //   this.venta.nuevo(this.f).subscribe(data=>{
  //     console.log(data)
  //     this.pdf(data);
  //     this.toastr.success("Venta Realizada","Exito");
  //     location.reload();
  //   },
  //   error=>{
  //     let e=error.status;
  //     console.log(e)
  //     this.toastr.error("error","No se pudo realizar la venta")
  //   }
  //   )
  }
  pdf(data:any){
  //     let v=data[0][0]
  //     let h=data[1][0]
  //     let datos=[]
  //     let c=1
  //     console.log(h)
  //     h.forEach(w => {
  //       let t=[]
  //       t.push(c++)
  //       t.push(w.id_detalle)
  //       t.push(w.cantidad)
  //       t.push(w.precio_venta)
  //       t.push(w.sub_total_venta)
  //       datos.push(t)
  //     });
  //     let t=["TOTAL","","","",v.total_venta]
  //     datos.push(t)
  //     console.log(datos)
  //     let fecha=new Date();
  //     const titulo="venta "+fecha;
  //     const doc = new jsPDF('p', 'pt', 'letter');
  //     doc.setFont('helvetica','bold')
  //     doc.setFontSize(15);
  //     // doc.text("COMERCIAL FERR-OLAM",210,25);
  //     // doc.text("VENTA",270,50);
  //     doc.setFont('helvetica','normal')
  //     doc.setFontSize(9);
  //     doc.text("NIT/CI:_________________________________________________",30,60);
  //     doc.text("Nombre:________________________________________________",30,80);
  //     doc.text(v.nit,70,60)
  //     doc.text(v.nombre,70,80)
  //     doc.setFontSize(9);
  //     let cabeza=['Nº','DESCRIPCION','CANTIDAD','PRECIO','SUB TOTAL']
  //     autoTable(doc,{columns:cabeza,bodyStyles:{fontSize:8},body:datos,theme:'grid',pageBreak:'auto',headStyles:{fillColor:[100,100,100],textColor:[255,255,255],fontSize:7},startY:100})
  //     // addFooters(doc);
  //   doc.save(titulo+'.pdf')

  }
  recibirClienteId(datos:string){
    this.formCliente.id=+datos
    console.log(datos)
  }
  recibirClienteNombre(datos:string){
    this.formCliente.nombre=datos
    console.log(datos)
  }
  recibirClienteNit(datos:string){
    this.formCliente.nit=datos
    console.log(datos)
  }
}
