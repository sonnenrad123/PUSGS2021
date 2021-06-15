import { WrDocumentStatus } from "../wr-document-status/wr-document-status.enum";
import { WorkRequestAttachments } from "./work-request-attachments";
import { WorkRequestBasicInfo } from "./work-request-basic-info";
import { WorkRequestEquipment } from "./work-request-equipment";
import { WorkRequestStateChangesHistory } from "./work-request-state-changes-history";

export class WorkRequest {
    basicInfo: WorkRequestBasicInfo;
    stateHistory: WorkRequestStateChangesHistory;
    attachments: WorkRequestAttachments;
    equipment: WorkRequestEquipment;

    constructor(wrin: WorkRequestBasicInfo, his: WorkRequestStateChangesHistory, att: WorkRequestAttachments, equ: WorkRequestEquipment){
        this.basicInfo = wrin;
        this.stateHistory = his;
        this.attachments = att;
        this.equipment = equ;
    }
}
