import { IElementFieldArttibutes, IElementFormArttibutes } from './Elements/interface/IElementArttibutes';
import Element from './render/Element';
import FromElement from './render/FormElement';
import { subscribeEvents } from './Event/Event';
import { FromSubmitCallback } from './Elements/form/Form';

export function form({Form, Field} : {Form: IElementFormArttibutes, Field: IElementFieldArttibutes[]}): string {

  const RenderedForm = new FromElement(Form, Field).render()

  return RenderedForm;

}


export function element( Field: IElementFieldArttibutes[]) {
  const element =  new Element(Field).render();
  return element;
}


window.addEventListener('load', function () {
  //run your script here to register events.
  subscribeEvents();
});
