import { Orgao } from './orgao';

export interface Servico {
    id: number;
    sigla: string;
    descricao: string;
    orgao: Orgao;
}