import { Incident } from "src/app/incident-browser/incident-browser.component";
import { WorkRequestDocumentType } from "../work-reques-doc-typet/work-request-document-type.enum";
import { WrDocumentStatus } from "../wr-document-status/wr-document-status.enum";

export class WorkRequestBasicInfo {
    typeOfDocument: WorkRequestDocumentType;
    statusOfDocument: WrDocumentStatus;
    createdBy: string;
    dateTimeCreated: Date;
    incident: Incident;
    emergencyWork: boolean;
    startDateTime: Date;
    endDateTime: Date;
    phoneNo: number;
    street: string;
    company: string;
    purpose: string;
    details: string;
    notes: string;
}

