export interface Chat {
  data: string;
  mensagens: [
    { texto: string,
      hora: string
      usuario: string
    }
  ];
}