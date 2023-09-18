export interface Content {
  header: string;
  content: string;
}

export interface AssociatedPublication {
  doi: string;
  date: string;
  title: string;
  authors: string[];
  journal: string;
  logo: string;
}

export interface Author {
  id: number;
  identity: string;
  order_by: number;
  name: string;
  email: string;
  orcid: string;
  institution: string;
  correspondingAuthor: boolean;
  prefix: string;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
}

export interface File {
  id: number;
  identity: string;
  added_by: string;
  created_at: string;
  extension: string;
  order_by: number;
  title: string;
  display: string;
  copyAsset: boolean;
  role: string;
  size: number;
  visible: boolean;
  origin: string;
  legend: string;
  description: string;
  filename: string;
  url: string;
}

export interface Journal {
  display: boolean;
  email: string;
  identity: string;
  isNatureJournal: boolean;
  hasQc: boolean;
  allowDirectSubmit: boolean;
  externalIdentity: string;
  sideBox: string;
  submissionUrl: string;
  title: string;
  twitterHandle: string;
}

export interface License {
  name: string;
  url: string;
}

export interface EditorialEvent {
  type: string;
  content: number;
}

export interface Journal {
  display: boolean;
  email: string;
  identity: string;
  isNatureJournal: boolean;
  hasQc: boolean;
  allowDirectSubmit: boolean;
  externalIdentity: string;
  sideBox: string;
  submissionUrl: string;
  title: string;
  twitterHandle: string;
}

export interface NonDraftVersion {
  code: number;
  date: string;
  doi: string;
  editorialEvents: EditorialEvent[];
  status: string;
  journal: Journal;
}

export interface SubjectArea {
  id: number;
  name: string;
}

export interface Attribute {
  acceptedTermsAndConditions: boolean;
  allowDirectSubmit: boolean;
  archivedVersions: any[];
  articleType: string;
  associatedPublications: AssociatedPublication[];
  authors: Author[];
  badges: any[];
  createdAt: string;
  currentVersionCode: number;
  declarations: string;
  doi: string;
  doiUrl: string;
  draftVersion: any[];
  editorialEvents: any[];
  editorialNote: string;
  failedWorkflow: any[];
  files: File[];
  financialInterests: string;
  fulltextSource: string;
  fullText: string;
  funders: any[];
  hasOptedInToPreprint: boolean;
  hasPassedJournalQc: string;
  hideJournal: boolean;
  highlight: string;
  institution: string;
  isAuthorSuppliedPdf: boolean;
  isDeskRejected: string;
  isHiddenFromSearch: boolean;
  isInQc: boolean;
  isInWorkflow: boolean;
  journal: Journal;
  keywords: string;
  license: License;
  manuscriptAbstract: string;
  manuscriptTitle: string;
  msid: string;
  msnumber: string;
  nonDraftVersions: NonDraftVersion[];
  origin: string;
  ownerIdentity: string;
  owner: any[];
  postedDate: string;
  published: boolean;
  revision: string;
  status: string;
  subjectAreas: SubjectArea[];
  tags: any[];
  versionOfRecord: any[];
  versionCreatedAt: string;
  video: string;
  vorDoi: string;
  vorDoiUrl: string;
  workflowStages: any[];
}

export interface ProtocalM {
  identity: string;
  title: string;
  content: Content[];
  attributes: Attribute;
}
