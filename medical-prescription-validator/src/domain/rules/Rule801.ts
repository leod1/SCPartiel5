import { Prescription } from "../entities/Prescription";
import { IRule } from "./IRule";

export class Rule801 implements IRule {
  private readonly MEDICATION_NAME = "X";

  validate(prescription: Prescription): void {
    const xMedication = prescription.medications.find(
      (med) => med.name === this.MEDICATION_NAME
    );

    if (!xMedication) {
      return;
    }

    const patient = prescription.patient;
    const isGammaProtocol = patient.protocol === "Gamma";
    const isRelapseAfter2019 = !!patient.hasRelapseAfter2019;

    let requiredWBC = 2000;

    if (isGammaProtocol && !isRelapseAfter2019) {
      requiredWBC = 1500;
    }

    if (patient.whiteBloodCellCount < requiredWBC) {
      throw new Error(
        `Règle 801 non respectée : Le patient n'a pas un taux de globules blancs suffisant (min: ${requiredWBC}).`
      );
    }
  }
}