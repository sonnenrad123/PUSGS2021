import { User } from "../user/user";
import { WorkRequestDocumentState } from "../work-reques-doc-state/work-request-document-state.enum";

export class WorkRequestStateChangesHistory {
    changedByUser: User;
    changedOn: Date;
    WRCurrentState: WorkRequestDocumentState;
}
