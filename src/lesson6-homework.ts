import { type } from "os";

// Create and use a type guard
function exercise29() {
  type TWidget = {
    name: string;
  };
  type TGadget = {
    os: string;
  };
  type TThing = TWidget | TGadget;

  // TODO: implement isWidget function to be a type guard
  function isWidget(arg: TThing): arg is TWidget {
    if ("name" in arg) return true;
    return false;
  }

  function printThingDescription(arg: TThing) {
    // TODO: uncomment the following code
    if (isWidget(arg)) {
      console.log(arg.name);
    } else {
      console.log(arg.os);
    }
  }
  printThingDescription({ name: "widget" });
  printThingDescription({ os: "android" });
}
exercise29();

// Create an overloaded function definitions
function exercise30() {
  type TWidget = {
    name: string;
    cost?: number;
  };
  type TGadget = {
    os: string;
    cost?: number;
  };
  type TThing = TWidget | TGadget;

  // TODO: add function overloading here to ensure that function return type matches the input value type
  function assignWidgetCost(obj: TWidget): TWidget;
  function assignWidgetCost(obj: TGadget): TGadget;

  function assignWidgetCost(obj: TThing): TThing {
    obj.cost = 100;
    return obj;
  }

  // TODO: fix problem - typeof a: TThing, not TWidget
  const a = assignWidgetCost({ name: "widget" } as TWidget);
  // TODO: fix same here - typeof b: TThing, not TGadget
  const b = assignWidgetCost({ os: "android" } as TGadget);

  console.log(a, b);
}
exercise30();

// Create call signatures
function exercise31() {
  function handleSaveUserSubmit(
    firstName: string,
    lastName: string,
    email?: string
  ) {}

  // TODO: add call signatures here. Add overrides for optional email param
  type TSaveUserCallback = {
    (firstName: string, lastName: string): void;
    (firstName: string, lastName: string, email?: string): void;
  };

  // TODO: add call signatures here. Add overrides for optional email param
  interface ISaveUserCallback {
    (firstName: string, lastName: string): void;
    (firstName: string, lastName: string, email?: string): void;
  }

  function createForm(onSubmit: TSaveUserCallback) {
    const firstName = "John";
    const lastName = "Smith";

    // TODO: uncomment the following line
    onSubmit(firstName, lastName);
  }
  function createForm2(onSubmit: ISaveUserCallback) {
    const firstName = "John";
    const lastName = "Smith";
    const email = "jsmith@somemail.some.com";

    // TOOD: uncomment the following line
    onSubmit(firstName, lastName, email);
  }

  // *** add constructor signatures here ***
  type TUser = {
    name: string;
  };
  type TUserConstructor = { new (name: string): TUser };
  interface IUserConstructor {
    new (name: string): TUser;
  }

  function createAndPrintUser(ctor: IUserConstructor) {
    // TOOD: uncomment the following lines
    const user = new ctor("John Smith");
    console.log(user);
  }

  const User = class {
    constructor(public name: string) {}
  };

  createAndPrintUser(User);
}
exercise31();

// Create an abstract class and concrete classes
function exercise32() {
  // TODO: make this class abstract
  abstract class Animal {
    constructor(public name: string) {
      this.name = name;
    }
    // TODO: add abstract method named makeSound
    abstract makeSound(): void;
    eat(): void {
      console.log("eating");
    }
  }
  // TODO: inherit from Animal and implement makeSound method
  class Dog extends Animal {
    makeSound(): void {
      console.log(`barking`);
    }
  }

  // TODO: uncomment the following lines, fix the errors
  const myDog = new Dog("Buddy");
  myDog.eat();
  myDog.makeSound();
}
exercise32();

// Create a type for a dictionary with string keys and number values
function exercise33() {
  // TODO: create a type TDictionary
  type TDictionary = {
    [key: string]: number;
  };

  // TODO: const dictionary variable of TDictionary type, assign some values (1, 2, 3)
  const dictionary: TDictionary = {
    a: 1,
    b: 2,
    c: 3,
  };

  // TODO: uncomment the following lines, fix the errors
  dictionary["c"] = 3;
  //   dictionary['d'] = '3'; // should cause an error error
  /* Error: Type 'string' is not assignable to type 'number'.ts(2322)
const dictionary: TDictionary */
  dictionary["d"] = 3;

  // TODO: implement a function that calculates number of characters
  // in a string using the dictionary type, and returns a most frequent character
  function getMostFrequentCharacter(str: string): string {
    const characters: TDictionary = {};
    for (let char of str) {
      char = char.toLowerCase();
      if (char in characters) {
        characters[char]++;
      } else characters[char] = 1;
    }

    // const maxFrequentValue = Math.max(...Object.values(characters));

    for (let key in characters) {
      if (characters[key] === Math.max(...Object.values(characters)))
        return key;
    }
    return "";
  }
  console.log(getMostFrequentCharacter("She sells seashells by the seashore."));
}
exercise33();

// Use index signature and caching
function exercise34() {
  // TODO: Define a dictionary of student grades, add type definition using index signature
  // key is a student name, value is an array of grades (numbers)
  type TDictionaryGrades = {
    [key: string]: number[];
  };

  type TDictionaryAveregeGrades = {
    [key: string]: number;
  };

  const studentGrades: TDictionaryGrades = {
    John: [5, 8, 1, 10, 2],
    Bob: [3, 12, 5],
    Mary: [8, 10, 2, 9, 4, 6],
    Ann: [11, 3, 12, 1, 8],
    Tom: [7, 6, 1, 11, 5],
    Mark: [2],
  };

  const studentsAverageGrades: TDictionaryAveregeGrades = {};

  // TODO: Implement function to calculate the average grade for a student
  function calculateAverageGrade(studentName: string): number | string {
    let studentFound: boolean;
    studentName in studentGrades
      ? (studentFound = true)
      : (studentFound = false);
    if (studentFound) {
      if (!studentsAverageGrades[studentName]) {
        // TODO: calculate average grade
        const averageGrade = +(
          studentGrades[studentName].reduce(
            (sum, current) => sum + current,
            0
          ) / studentGrades[studentName].length
        ).toFixed(1);
        studentsAverageGrades[studentName] = averageGrade;
      }

      return studentsAverageGrades[studentName];
    } else {
      return "Student not found";
    }
  }

  // TODO: Iterate through the dictionary and display each student's average grade
  for (const studentName in studentGrades) {
    // TODO: call calculateAverageGrade and print the result
    console.log(studentName, calculateAverageGrade(studentName));
  }

  // TODO: add caching for the average grade calculation to the calculateAverageGrade function
}
exercise34();
