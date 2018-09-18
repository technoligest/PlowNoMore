import { Validators as Valids } from '@angular/forms';

export const Validators = {
  nameValidatorList: [Valids.required, Valids.minLength(2)],
  emailValidatorList: [Valids.required, Valids.email],
  phoneValidatorList: [Valids.required, Valids.minLength(10), Valids.pattern('[0-9]*')],
  passwordValidatorList: [Valids.required, Valids.minLength(8),
                          Valids.pattern('.*[0-9].*'), Valids.pattern('.*[!@#$%^&*].*')],
  costValidatorList: [Valids.required],
  dateValidatorList: [Valids.required]
};

// export const baseUrl = 'http://plownomore.azurewebsites.net/api/';
export const baseUrl = 'http://localhost:3000/api/';


export const stringResources = {

};
