import { IRule } from "../domain/rules/IRule";
import { Prescription } from "../domain/entities/Prescription";

export class PrescriptionValidator {
  private rules: IRule[] = [];

  constructor(rules: IRule[]) {
    this.rules = rules;
  }

  validate(prescription: Prescription): void {
    for (const rule of this.rules) {
      rule.validate(prescription);
    }
  }
}
