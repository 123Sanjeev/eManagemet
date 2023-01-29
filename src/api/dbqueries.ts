import { backendURL } from "../compontents/globals/global_variable";
import { QuestionForm } from "../compontents/Questions/Question";
import { ViewQuestion } from "../compontents/Questions/Question";

type registerType = {
  userId: number;
  username: string;
  password: string;
  location: string;
};

class db {
  BASE_URL = backendURL;

  findOne(table: string) {
    return "";
  }

  findUsingQuery(table: string, params: string[]) {}

  async login(data: { userId: number; password: string; loginkey: string }) {
    console.log(data);

    try {
      var loginResponse = await fetch(`${backendURL}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(loginResponse.status);
      if (loginResponse.ok) {
        return await loginResponse.json();
      } else {
        return {
          message: loginResponse.statusText,
          status_code: loginResponse.status,
        };
      }
    } catch (err) {
      console.log(err);
      console.log(typeof err);
      return {
        type: "error",
        message: "", //err.toString()
      };
    }
  }

  async register(formdata: registerType) {
    const res = await fetch(`${backendURL}user/register/${formdata.userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });

    return await res.json();
  }
  async registerInit() {
    const response = await fetch(`${backendURL}user/register`);
    return await response.text();
  }

  async getSubOption(option: string) {
    const response = await fetch(
      `${backendURL}question/suboption?option=${option}`,
      {
        method: "POST",
      }
    );
    return await response.json();
  }

  async initQuestion() {
    const response = await fetch(`${backendURL}question/initQuestion`)
    const newQuestionid = await response.text()
    return newQuestionid;
  }

  async saveQuestion(question: QuestionForm, type : string) {
    const response = await fetch(`${backendURL}question/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });
    return await response.json();
  }

  async viewQuestions(viewQuestions: ViewQuestion) {
    const response = await fetch(`${backendURL}question/viewQuestions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(viewQuestions),
    });
    return await response.json();
  }
  async viewQuestionWithId(id:number){
    const response = await fetch(`${backendURL}question/viewQuestionWithId?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const questionData = await response.json()
    return questionData
  }
}
export default new db();
