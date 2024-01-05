import { convertStringNumber } from "./helpers.js";
import { postData } from "./servise.js";

const financeForm = document.querySelector(".finance__form");
const financeAmount = document.querySelector(".finance__amount");

let amount = 0;
financeAmount.textContent = amount;

export const financeControl = () => {
  financeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const typeOperation = e.submitter.dataset.typeOperation;

    const financeFormDate = Object.fromEntries(new FormData(financeForm));
    financeFormDate.type = typeOperation;

    const newOperation = await postData("/finance", financeFormDate);
    console.log("financeFormDate:", financeFormDate);

    const changeAmount = Math.abs(convertStringNumber(newOperation.amount));

    if (typeOperation === "income") {
      amount += changeAmount;
    }
    if (typeOperation === "expenses") {
      amount -= changeAmount;
    }

    financeAmount.textContent = `${amount.toLocaleString("RU-ru")} ₽`;
    financeForm.reset();
  });
};
