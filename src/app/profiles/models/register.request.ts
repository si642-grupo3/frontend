export class RegisterRequest{
    public nombre: string;
    public apellido: string;
    public ruc: string;
    public telefono: string;
    public direccin: string;
    public email: string;
    public password: string;

    constructor(nombre: string, apellido: string, ruc: string, telefono: string, direccin: string, email: string, password: string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.ruc = ruc;
        this.telefono = telefono;
        this.direccin = direccin;
        this.email = email;
        this.password = password;
    }
}