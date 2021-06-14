import { Incident } from "src/app/incident-browser/incident-browser.component";
import { WorkRequestDocumentType } from "../work-reques-doc-typet/work-request-document-type.enum";
import { WrDocumentStatus } from "../wr-document-status/wr-document-status.enum";

export class WorkRequestBasicInfo {
    WRDocumentType: WorkRequestDocumentType;
    WRDocumentStatus: WrDocumentStatus;
    WRDocumentCreatedBy: string;
    WRDocumentDate: Date;
    WRDocumentRelatedIncident: Incident;
    WRDocumentTypeOfWork: string;
    WRDocumentEmergWork: boolean;
    WRDocStartDate: Date;
    WRDocEndDate: Date;
    WrDocPhoneNo: number;
    WRDocAddress: string;
    WRDocCompany: string;
    WRDocPurpose: string;
    WRDocDetails: string;
    WRDocNotes: string;
}

