import { IRule } from "./IRule";
import { Prescription } from "../entities/Prescription";

export class Rule327 implements IRule {
  private readonly MEDICATION_Y = "Y";
  private readonly MEDICATION_Z = "Z";
  private readonly REQUIRED_MARKER = "BRCA1";

  validate(prescription: Prescription): void {
    const hasY = prescription.medications.some(
      (med) => med.name === this.MEDICATION_Y
    );
    const hasZ = prescription.medications.some(
      (med) => med.name === this.MEDICATION_Z
    );

    if (!hasY || !hasZ) {
      return;
    }

    const isWednesday = prescription.date.getDay() === 3; 
    const underIRMSurveillance = !!prescription.underIRMSurveillance;

    if (isWednesday && underIRMSurveillance) {
      return; 
    }

    const patientMarkers = prescription.patient.geneticMarkers || [];
    if (!patientMarkers.includes(this.REQUIRED_MARKER)) {
      throw new Error(
        `Règle 327 non respectée : Le patient doit avoir le marqueur génétique BRCA1 pour combiner Y et Z.`
      );
    }
  }
}
