import { Prescription } from "../entities/Prescription";

export interface IRule {
    validate(prescription: Prescription): void;
  }