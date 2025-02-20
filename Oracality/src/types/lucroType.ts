export type lucrosType = {
    data: data[];
  };
  
  export type data = {
    ModificadoEm: string;
    criadoEm: string;
    estaDeletado: boolean;
    estaRecebido: boolean;
    id: string;
    idClasseLancamento: string;
    idUsuario: string;
    titulo: string;
    valor: number;
    ClasseLancamento?: ClasseLancamento;
    Usuario?: Usuario;
  };
  
  type ClasseLancamento = {
      nome: string;
  }
  
  type Usuario = {
      nome: string;
  }
  
  
  export type dataToEditAndAddLucroType =  {
      estaDeletado?: boolean,
      idUsuario?: string,
      idClasseLancamento?: string;
      titulo?: string,
      valor?: number,
    }
  