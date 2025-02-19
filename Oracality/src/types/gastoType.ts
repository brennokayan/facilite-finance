export type gastosType = {
  data: data[];
};

export type data = {
  ModificadoEm: string;
  criadoEm: string;
  estaDeletado: boolean;
  estaPago: boolean;
  id: string;
  idClasseLancamento: string;
  idUsuario: string;
  titulo: string;
  valor: number;
  ClasseLucro?: ClasseLucro;
  Usuario?: Usuario;
};

type ClasseLucro = {
    nome: string;
}

type Usuario = {
    nome: string;
}


export type dataToEditAndAddgastoAddEditType =  {
    estaDeletado?: boolean,
    idUsuario?: string,
    idClasseLancamento?: string;
    titulo?: string,
    valor?: number,
  }
