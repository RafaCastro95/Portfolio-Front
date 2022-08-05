export class persona{
    id?: number;
    nombre: String;
    apellido: String;
    titulo: String;
    descripcion: String;
    fotoPerfil: String;
    

    constructor(nombre:String,apellido:String,titulo:String, descripcion:String,fotoPerfil:String,fotoBanner:String){
        this.nombre = nombre;
        this.apellido = apellido;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fotoPerfil = fotoPerfil;
    }
}