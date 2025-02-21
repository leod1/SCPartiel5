
import { IRule } from "./IRule";
import { Prescription } from "../entities/Prescription";
import { Medication } from "../entities/Medication";

export class Rule666 implements IRule {
  private readonly MEDICATION_W = "W";

  constructor(private currentStockW: number) {}

  validate(prescription: Prescription): void {
    const wMedication = prescription.medications.find(
      (med) => med.name === this.MEDICATION_W
    );

    if (!wMedication) {
      return; 
    }

    const requestedQuantity = wMedication.requestedQuantity;
    const dayOfWeek = prescription.date.getDay(); 
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; 

    let totalNeeded = requestedQuantity + 3;
    const securityMargePourcentage = 0.2

    if (isWeekend) {
      totalNeeded += requestedQuantity * securityMargePourcentage; 
    }

    if (this.currentStockW < totalNeeded) {
      throw new Error(
        `Règle 666 non respectée : Stock de W insuffisant. Stock actuel: ${this.currentStockW}, besoin total: ${totalNeeded}.`
      );
    }
  }
}
