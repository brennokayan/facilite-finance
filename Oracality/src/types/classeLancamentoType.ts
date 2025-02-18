export type classeLancamentoType = {
  success: boolean;
  data: data[];
};

export type dataToEditAndAddClasseLancamentoType = {
  nome?: string;
  estaDeletado?: boolean;
};

export type data ={
  id: string;
  nome: string;
  estaDeletado: boolean;
}
