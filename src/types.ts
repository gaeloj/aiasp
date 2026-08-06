export interface Associate {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  joiningDate: string;
  status: 'Ativo' | 'Inativo';
  address: string;
  monthlyFee: number;
  
  // New fields requested by user
  rgNumero?: string;
  rgOrgaoExpedidor?: string;
  rgDataExpedicao?: string;
  rgUf?: string;
  cinNumero?: string;
  nis?: string;
  caf?: string;
  birthDate?: string;
  filiation?: string;
  fatherName?: string;
  motherName?: string;
  fatherNotDeclared?: boolean;
  cinOrgaoExpedidor?: string;
  cinDataExpedicao?: string;
  cinUf?: string;
  photo?: string; // base64 representation of the photo
  gender?: 'Masculino' | 'Feminino' | 'Outro';
  financialStatus: 'Adimplente' | 'Inadimplente' | 'Zona de Perigo' | 'Em Atenção';
  debtAmount?: number;
  documentStatus?: 'OK' | 'Com Pendência';
  maxInstallmentsAllowed?: number;
  installmentPlan?: {
    totalAmount: number;
    installmentsCount: number;
    installmentValue: number;
    paymentMethod: string;
    dateConfirmed: string;
    status: 'Em Análise' | 'Aprovado' | 'Reprovado' | 'Pago';
    installments?: {
      number: number;
      dueDate: string;
      value: number;
      status: 'Pendente' | 'Pago' | 'Em Análise' | 'Recusado';
      receiptFile?: string;
      receiptFileName?: string;
      paymentDate?: string;
      feedback?: string;
      submittedAt?: string;
      reviewedAt?: string;
    }[];
  };
  certidaoTipo?: 'Nascimento' | 'Casamento' | 'Divórcio' | 'Óbito' | 'Nenhuma';
  certidaoModelo?: 'Novo' | 'Antigo';
  certidaoNumero?: string; // Matricula for new model, or Termo/Livro/Folha for old model
  
  pendingMonthlyReceipts?: {
    monthKey: string;
    monthName: string;
    amount: number;
    paymentMethod: string;
    receiptFile?: string;
    receiptFileName?: string;
    dateSubmitted: string;
    status?: 'Em Análise' | 'Aprovado' | 'Reprovado';
    submittedAt?: string;
    reviewedAt?: string;
    feedback?: string;
  }[];

  // Login and Matricula fields
  matricula?: string;
  username?: string;
  password?: string;
  loginStatus?: 'Ativo' | 'Bloqueado' | 'Congelado';
  memberType?: 'Associado' | 'Cliente';
  associationRole?: string; // Função dentro da associação (Ex: Presidente, Vice, Secretaria(o), Tesoureira(o), Diretor(a) de Costumes e Tradições, Conselho Fiscal, Nenhum)
  hasVotingRight?: boolean;
  monthlyPayments2026?: { [monthKey: string]: 'Pago' | 'Não Pago' | 'Pendente' };
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'Entrada' | 'Saída';
  date: string;
  time?: string; // e.g. "14:30:00"
  category: string;
  associateId?: string; // Link to associate if it's a payment
  paymentMethod: string;
  document?: string; // CPF or CNPJ
  payerReceiverName?: string; // Name of person who paid or received
  createdBy?: string; // E.g. "Administrador"
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  targetGroup: 'Todos' | 'Somente Ativos';
  createdAt?: string;
}

export interface ReportCopy {
  id: string;
  reportNumber: string;
  issuedAt: string; // e.g. "28/06/2026 20:15:59"
  issuedBy: string;
  createdAt?: string;
  filters: {
    type: string;
    category: string;
    search: string;
  };
  transactions: {
    id: string;
    description: string;
    amount: number;
    type: 'Entrada' | 'Saída';
    date: string;
    time?: string;
    category: string;
    document?: string;
    payerReceiverName?: string;
    createdBy?: string;
  }[];
  totalInflow: number;
  totalOutflow: number;
  netBalance: number;
}

export interface UserSession {
  role: 'admin' | 'associate';
  associateId?: string; // If role is associate, this is their Associate ID
}

export interface Assembly {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  agenda: string; // pautas
  createdAt: string;
  type?: 'Assembleia' | 'Atividade'; // type of event
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  imageUrl?: string;
}

export interface Poll {
  id: string;
  title: string;
  date: string; // Keep for fallback/legacy UI but will map to endDate
  time: string; // Keep for fallback/legacy UI but will map to endTime
  location: string;
  agenda: string; // pautas
  options: PollOption[];
  status: 'Ativo' | 'Encerrado';
  voters: string[]; // List of associateIds who have voted
  voterChoices?: { [associateId: string]: string }; // Map of associateId to optionId
  winnerOptionId?: string; // set once closed
  createdAt: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  hasImages?: boolean;
}

export interface EntityConfig {
  logo?: string;
  name: string;
  cnpj: string;
  acronym: string;
  email: string;
  phone: string;
  address: string;
  city?: string;
  monthlyFee: number;
  presidentName?: string;
  inepCode?: string; // Código INEP da Escola
  schoolSegments?: string; // ex: Educação Infantil, Ensino Fundamental, Ensino Médio
}

export interface AdminConfig {
  email: string;
  password?: string;
  isConfigured: boolean;
}

export interface AttestationRecord {
  id: string;
  type: 'recebimento' | 'saida' | 'filiacao' | 'servicos';
  documentNumber: string;
  authCode?: string;
  title: string;
  personName: string;
  documentNumberPerson?: string; // CPF or CNPJ
  amount?: number;
  date: string;
  description: string;
  createdAt: string;
}

export interface Collaborator {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  role: string; // Cargo/Função ex: Professor de Matemática, Coordenadora, Diretor
  department?: string; // Setor/Departamento Escolar ex: Corpo Docente, Coordenação, Secretaria, Direção, Apoio
  subject?: string; // Disciplina/Matéria (para professores)
  registration?: string; // Matrícula Funcional ex: ESC-2026-001
  accessLevel: 'Administrador' | 'Atendimento' | 'Financeiro' | 'Consulta' | 'Docente';
  username: string;
  password?: string;
  status: 'Ativo' | 'Bloqueado';
  createdAt: string;
  lastAccess?: string;
}

export interface Charge {
  id: string;
  codeNumber: string; // e.g. "COB-2026-001"
  recipientId: string; // Associate ID or Client ID
  recipientName: string;
  recipientType: 'Associado' | 'Cliente';
  recipientDocument: string; // CPF or CNPJ
  recipientEmail?: string;
  recipientPhone?: string;
  title: string;
  description?: string;
  amount: number;
  issueDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  status: 'Pendente' | 'Pago' | 'Vencido' | 'Cancelado';
  paymentMethod?: string; // PIX, Boleto, Cartão, Transferência, Dinheiro
  paidAt?: string; // YYYY-MM-DD
  pixKey?: string;
  receiverName?: string;
  receiverBank?: string;
  customQrCodeUrl?: string;
  barcode?: string;
  createdAt: string;
  notes?: string;
}



