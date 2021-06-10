package com.pio.CadUnico.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PaginasController {

	@RequestMapping({"","/"})
	public ModelAndView pagina() {
		ModelAndView mv = new ModelAndView("CadastroUsuario");
		return mv;
	}
}
