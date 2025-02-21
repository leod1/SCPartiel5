import { Patient } from "./domain/entities/Patient";
import { Medication } from "./domain/entities/Medication";
import { Prescription } from "./domain/entities/Prescription";

import { Rule801 } from "./domain/rules/Rule801";
import { Rule327 } from "./domain/rules/Rule327";
import { Rule666 } from "./domain/rules/Rule666";

import { PrescriptionValidator } from "./services/PrescriptionValidator";

function main() {

  const patient = new Patient(
    "patient-123",
    2500,           // Taux de globules blancs
    "Gamma",        // Protocole
    false,          // Pas de rechute après 2019
    ["BRCA1"]       // Marqueurs génétiques
  );

  // Exemple de prescription : Médicament X, W, Y, ...
  const prescription = new Prescription(
    patient,
    [
      new Medication("X", 1),  // Règle 801
      new Medication("W", 2),  // Règle 666
      new Medication("Y", 1),  // Règle 327
    ],
    new Date("2025-02-19"),    // Supposons un mercredi 2025-02-19 => (Mercredi fictif, en réalité 2025-02-19 est un mercredi)
    true                       // Sous surveillance IRM
  );

  // Exemple de stock W
  const currentStockW = 10;

  // Instanciation des règles
  const rules = [
    new Rule801(),
    new Rule327(),
    new Rule666(currentStockW),
  ];

  const validator = new PrescriptionValidator(rules);

  try {
    validator.validate(prescription);
    console.log("Prescription validée avec succès !");
  } catch (error) {
    console.error("Échec de la validation :", (error as Error).message);
  }
}

main()
