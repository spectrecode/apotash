// Generated by CoffeeScript 1.10.0
app.controller('editarBibliografiaCrtl', [
  '$scope', '$http', '$timeout', '$rootScope', '$routeParams', '$cookieStore', '$location', 'AuthenticationService', function(scope, http, timeout, rootScope, routeParams, cookieStore, location2, AuthenticationService) {
    scope.codigo = 7;
    if (cookieStore.get('nom_accion')) {
      scope.nom_accion = cookieStore.get('nom_accion');
    } else {
      scope.nom_accion = "";
    }
    scope.form = [];
    scope.form = {};
    scope.class_mess = "";
    scope.tip_multimedia = 0;
    scope.name_tip_multimedia = "";
    scope.formData = new FormData();
    scope.rutaImg = "resources/assets/image/bibliografia/";
    scope.url = "controller/bibliografia/procesar.php";
    scope.borrarMensaje = function() {
      $(".inner-alert").fadeOut("slow");
    };
    scope.mostrarError = function() {
      if (scope.class_mess === "exito") {
        if ($(".inner-alert .alert").hasClass("error")) {
          $(".inner-alert .alert").removeClass("error");
          $(".inner-alert .alert").addClass(scope.class_mess);
        }
      } else {
        if ($(".inner-alert .alert").hasClass("exito")) {
          $(".inner-alert .alert").removeClass("exito");
          $(".inner-alert .alert").addClass(scope.class_mess);
        }
      }
      $(".inner-alert").fadeIn("slow");
      timeout(scope.borrarMensaje, 3000);
    };
    scope.setup = function() {
      scope.editorOptions = {
        language: 'ru'
      };
      scope.$on("ckeditor.ready", function(event) {
        scope.isReady = true;
      });
      $(".cke_contents").css("height", "200");
    };
    scope.procesarForm = function(data) {
      scope.formData.append("titulo", data.titulo);
      scope.formData.append("frase", data.frase);
      scope.formData.append("order", 1);
      scope.formData.append("f_publicacion", data.f_publicacion);
      scope.formData.append("descrip_superior", data.descrip_superior);
      scope.formData.append("descrip_inferior", data.descrip_inferior);
      scope.formData.append("file_portada", $("#file_portada")[0].files[0]);
      scope.formData.append("act_img_portada", scope.form.act_img_portada);
      scope.formData.append("tip_multimedia", scope.tip_multimedia);
      scope.formData.append("mul_fileImagen", $("#mul_fileImagen")[0].files[0]);
      scope.formData.append("act_mul_imagen", scope.form.act_mul_imagen);
      scope.formData.append("mul_video", data.mul_video);
      scope.formData.append("codigo", scope.codigo);
      $.ajax({
        url: scope.url,
        type: "post",
        dataType: "html",
        data: scope.formData,
        cache: false,
        contentType: false,
        processData: false
      }).done(function(res, status) {
        var response;
        response = JSON.parse(res);
        scope.codigo = response.codigo;
        scope.nom_accion = "Editar";
        cookieStore.put('codigo', scope.codigo);
        cookieStore.put('nom_accion', "Editar");
        $(".inner-alert .alert p").html("<strong>" + response.message + "</strong>");
        scope.class_mess = response.class_mess;
        timeout(scope.detalle, 1500);
        scope.mostrarError();
      });
    };
    scope.activarCaja = function(cod, name) {
      var seleccionado;
      seleccionado = $(".cajaselect .seleccionado");
      seleccionado.text(name);
      $(".multimedia").fadeOut("slow", function() {
        return $("#multimedia-" + cod).fadeIn("slow");
      });
    };
    scope.clickcaja = function(e) {
      var lista, triangulo;
      lista = $(this).find("ul");
      triangulo = $(this).find("span:last-child");
      e.preventDefault();
      $(this).find("ul").toggle();
      if (lista.is(":hidden")) {
        triangulo.removeClass("triangulosup").addClass("trianguloinf");
      } else {
        triangulo.removeClass("trianguloinf").addClass("triangulosup");
      }
    };
    scope.clickli = function(e) {
      var lista, seleccionado, texto, triangulo;
      texto = $(this).text();
      scope.tip_multimedia = $(this).find("a").data("id");
      $(".multimedia").fadeOut("slow", function() {
        return $("#multimedia-" + scope.tip_multimedia).fadeIn("slow");
      });
      seleccionado = $(this).parent().prev();
      lista = $(this).closest("ul");
      triangulo = $(this).parent().next();
      e.preventDefault();
      e.stopPropagation();
      seleccionado.text(texto);
      lista.hide();
      triangulo.removeClass("triangulosup").addClass("trianguloinf");
    };
    scope.detalle = function() {
      var data, result, url;
      data = {
        codigo: scope.codigo
      };
      url = './controller/bibliografia/detalle.php';
      result = http.post(url, data);
      result.success(function(response) {
        var $fileupload2;
        scope.form = response[0];
        scope.codigo = scope.form.codigo;
        scope.tip_multimedia = scope.form.tip_multimedia;
        scope.name_tip_multimedia = scope.form.name_tip_multimedia;
        $fileupload2 = $('#mul_fileImagen');
        $fileupload2.wrap('<form>').closest('form').get(0).reset();
        $fileupload2.unwrap();
        if (scope.codigo > 0) {
          scope.activarCaja(scope.tip_multimedia, scope.name_tip_multimedia);
        }
      });
      result.error(function(error) {
        console.log(error);
      });
    };
    $(".cajaselect").click(scope.clickcaja);
    $(".cajaselect").on("click", "li", scope.clickli);
    scope.detalle();
    timeout(scope.setup, 500);
  }
]);

app.controller('LoginCrl', [
  '$scope', '$http', '$timeout', '$rootScope', '$location', 'AuthenticationService', function(scope, http, timeout, rootScope, location, AuthenticationService) {
    scope.msnjlogin = '';
    scope.auth_token = '';
    scope.captcha = '';
    scope.nameform = 'loginForm';
    scope.setup = function() {
      var $height, altologin, data, result, url;
      $height = $(window).height();
      altologin = $height - 75;
      $('.inner-login').css('min-height', altologin + 'px');
      $('body').css('min-height', $height + 'px');
      data = {
        nameform: scope.nameform
      };
      url = './controller/login/formulario.php';
      result = http.post(url, data);
      result.success(function(response) {
        scope.auth_token = response.token;
        scope.captcha = response.captcha;
      });
      result.error(function(error) {
        console.log(error);
      });
      scope.validacion();
    };
    scope.validacion = function() {
      $("#login").validate({
        rules: {
          usuario: "required",
          captcha: "required",
          password: "required"
        },
        messages: {
          usuario: "",
          captcha: "",
          password: ""
        }
      });
    };
    scope.borrarMensaje = function() {
      $(".inner-alert").fadeOut("slow");
      if ($(".inner-alert .alert").hasClass("exito")) {
        $(".inner-alert .alert").removeClass("exito");
      }
      if ($(".inner-alert .alert").hasClass("error")) {
        $(".inner-alert .alert").removeClass("error");
      }
    };
    scope.mostrarError = function(info) {
      if ($(".inner-alert .alert").hasClass("exito")) {
        $(".inner-alert .alert").removeClass("exito");
      }
      if ($(".inner-alert .alert").hasClass("error") === false) {
        $(".inner-alert .alert").addClass("error");
      }
      $(".inner-alert").fadeIn("slow");
      timeout(scope.borrarMensaje, 5000);
    };
    scope.enviarDatos = function(data) {
      if ($("#login").valid()) {
        AuthenticationService.Login(data.usuario, data.password, scope.auth_token, scope.nameform, data.captcha, function(response) {
          if (response.success) {
            AuthenticationService.SetCredentials(data.usuario, data.password, response.nombreUser, response.perfil, response.photoUser);
            location.path('/vista/principal');
          } else {
            scope.msnjlogin = response.message;
            scope.mostrarError();
          }
        });
      } else {
        scope.msnjlogin = 'Sus credenciales no son correctas';
        scope.mostrarError();
      }
    };
    AuthenticationService.ClearCredentials();
    timeout(scope.setup, 200);
    window.addEventListener("resize", scope.setup);
  }
]);

app.controller('menuPrincipalCrtl', [
  '$scope', '$location', '$timeout', '$http', '$rootScope', '$routeParams', '$cookieStore', function(scope, location2, timeout, http, rootScope, routeParams, cookieStore) {
    scope.data = cookieStore.get('globals');
    scope.nombreUser = scope.data.currentUser.nombreUser;
    scope.perfilUser = scope.data.currentUser.perfil;
    scope.photoUser = scope.data.currentUser.photo;
    scope.setup = function() {
      var h;
      h = $(window).height();
      $("#menuLeft").css("min-height", h);
    };
    scope.setup();
  }
]);

app.controller('editarNoticiaCrtl', [
  '$scope', '$http', '$timeout', '$rootScope', '$routeParams', '$cookieStore', '$location', 'AuthenticationService', function(scope, http, timeout, rootScope, routeParams, cookieStore, location2, AuthenticationService) {
    if (cookieStore.get('codigo')) {
      scope.codigo = cookieStore.get('codigo');
    } else {
      scope.codigo = -1;
    }
    if (cookieStore.get('nom_accion')) {
      scope.nom_accion = cookieStore.get('nom_accion');
    } else {
      scope.nom_accion = "";
    }
    scope.form = [];
    scope.form = {};
    scope.form_en = [];
    scope.form_en = {};
    scope.listcat = [];
    scope.listcat = {};
    scope.class_mess = "";
    scope.not_tag = "";
    scope.tip_multimedia = 0;
    scope.categoria = 0;
    scope.name_tip_multimedia = "";
    scope.checkboxModel = {
      value1: false
    };
    scope.checkboxDestacado = {
      value1: false
    };
    scope.checkboxModel_en = {
      value1: false
    };
    scope.checkboxDestacado_en = {
      value1: false
    };
    scope.formData = new FormData();
    scope.rutaImg = "resources/assets/image/noticias/";
    scope.url = "controller/noticia/procesar.php";
    scope.listgal = [];
    scope.mostrarIdioma = function(id) {
      if (id === 1) {
        $("#inner-espanol").css("display", "block");
        $("#inner-ingles").css("display", "none");
        $("#btn-espanol").removeClass("active").addClass("active");
        $("#btn-ingles").removeClass("active");
      } else {
        $("#inner-espanol").css("display", "none");
        $("#inner-ingles").css("display", "block");
        $("#btn-ingles").removeClass("active").addClass("active");
        $("#btn-espanol").removeClass("active");
      }
    };
    scope.borrarMensaje = function() {
      $(".inner-alert").fadeOut("slow");
    };
    scope.mostrarError = function() {
      if (scope.class_mess === "exito") {
        if ($(".inner-alert .alert").hasClass("error")) {
          $(".inner-alert .alert").removeClass("error");
          $(".inner-alert .alert").addClass(scope.class_mess);
        }
      } else {
        if ($(".inner-alert .alert").hasClass("exito")) {
          $(".inner-alert .alert").removeClass("exito");
          $(".inner-alert .alert").addClass(scope.class_mess);
        }
      }
      $(".inner-alert").fadeIn("slow");
      timeout(scope.borrarMensaje, 8000);
    };
    scope.setup = function() {
      scope.editorOptions = {
        language: 'ru'
      };
      $("#f_publicacion").datepicker({
        dateFormat: 'yy-mm-dd'
      });
      $("#f_publicacion_en").datepicker({
        dateFormat: 'yy-mm-dd'
      });
      scope.$on("ckeditor.ready", function(event) {
        scope.isReady = true;
      });
      $(".cke_contents").css("height", "200");
      scope.listarGaleria();
    };
    scope.validarCaracteres = function(titulo) {
      var errorMsn, miMsn, numTitulo;
      numTitulo = titulo.length;

      /*
      		if descripcion == undefined || descripcion == null
      			numDescripcion = 0
      			alert numDescripcion
      		else
      			numDescripcion = descripcion.length
       */
      errorMsn = true;
      miMsn = '';
      if (numTitulo > 65) {
        errorMsn = false;
        miMsn += 'Título sobrepasa los 65 caracteres. ';
      }

      /*
      		if (numDescripcion > 209)
      			errorMsn = false
      			miMsn+= 'Descripción corta sobrepasa los 160 caracteres'
      			##alert numDescripcion
       */
      if (errorMsn === false) {
        scope.class_mess = "error";
        $(".inner-alert .alert p").html("<strong>" + miMsn + "</strong>");
        scope.mostrarError();
      }
      return errorMsn;
    };
    scope.procesarForm_en = function(data) {
      var respuestaCaracter, url_en;
      scope.formData.append("titulo", data.titulo_en);
      scope.formData.append("frase", data.frase_en);
      scope.formData.append("url_seo", data.url_seo_en);
      scope.formData.append("order", 1);
      scope.formData.append("f_publicacion", data.f_publicacion_en);
      scope.formData.append("descrip_superior", data.descrip_superior_en);
      scope.formData.append("descrip_inferior", data.descrip_inferior_en);
      scope.formData.append("file_portada", $("#file_portada_en")[0].files[0]);
      scope.formData.append("act_img_portada", scope.form.act_img_portada_en);
      scope.formData.append("galeria", $("#galeria")[0].files[0]);
      scope.formData.append("categoria", 1);
      scope.formData.append("codigo", scope.codigo);
      url_en = "controller/noticia/procesar_en.php";
      respuestaCaracter = true;
      if (respuestaCaracter) {
        $.ajax({
          url: url_en,
          type: "post",
          dataType: "html",
          data: scope.formData,
          cache: false,
          contentType: false,
          processData: false
        }).done(function(res, status) {
          var $fileupload2, response;
          response = JSON.parse(res);
          scope.codigo = response.codigo;
          scope.nom_accion = "Editar";
          cookieStore.put('codigo', scope.codigo);
          cookieStore.put('nom_accion', "Editar");
          $fileupload2 = $('#galeria');
          $fileupload2.wrap('<form>').closest('form').get(0).reset();
          $fileupload2.unwrap();
          $(".inner-alert .alert p").html("<strong>" + response.message + "</strong>");
          scope.class_mess = response.class_mess;
          timeout(scope.detalle_en, 1500);
          timeout(scope.detalle, 1500);
          timeout(scope.listarGaleria, 1500);
          scope.mostrarError();
        });
      }
    };
    scope.procesarForm = function(data) {
      var respuestaCaracter;
      scope.formData.append("titulo", data.titulo);
      scope.formData.append("frase", data.frase);
      scope.formData.append("url_seo", data.url_seo);
      scope.formData.append("order", 1);
      scope.formData.append("f_publicacion", data.f_publicacion);
      scope.formData.append("descrip_superior", data.descrip_superior);
      scope.formData.append("descrip_inferior", data.descrip_inferior);
      scope.formData.append("file_portada", $("#file_portada")[0].files[0]);
      scope.formData.append("act_img_portada", scope.form.act_img_portada);
      scope.formData.append("galeria", $("#galeria")[0].files[0]);
      scope.formData.append("categoria", 1);
      scope.formData.append("mul_video", data.mul_video);
      scope.formData.append("estado", scope.checkboxModel.value1);
      scope.formData.append("destacado", scope.checkboxDestacado.value1);
      scope.formData.append("codigo", scope.codigo);
      respuestaCaracter = true;
      if (respuestaCaracter) {
        $.ajax({
          url: scope.url,
          type: "post",
          dataType: "html",
          data: scope.formData,
          cache: false,
          contentType: false,
          processData: false
        }).done(function(res, status) {
          var $fileupload2, response;
          response = JSON.parse(res);
          scope.codigo = response.codigo;
          scope.nom_accion = "Editar";
          cookieStore.put('codigo', scope.codigo);
          cookieStore.put('nom_accion', "Editar");
          $fileupload2 = $('#galeria');
          $fileupload2.wrap('<form>').closest('form').get(0).reset();
          $fileupload2.unwrap();
          $(".inner-alert .alert p").html("<strong>" + response.message + "</strong>");
          scope.class_mess = response.class_mess;
          timeout(scope.detalle, 1500);
          timeout(scope.listarGaleria, 1500);
          scope.mostrarError();
        });
      }
    };
    scope.activarCaja = function(cod, name, cajaId) {
      var seleccionado;
      if (cajaId === "tipomultimedia") {
        seleccionado = $(".cajaselect .seleccionado");
        seleccionado.text(name);
        $(".multimedia").fadeOut("slow", function() {
          return $("#multimedia-" + cod).fadeIn("slow");
        });
      } else {
        seleccionado = $("#" + cajaId + " .seleccionado");
      }
      seleccionado.text(name);
    };
    scope.clickcaja = function(e) {
      var lista, triangulo;
      lista = $(this).find("ul");
      triangulo = $(this).find("span:last-child");
      e.preventDefault();
      $(this).find("ul").toggle();
      if (lista.is(":hidden")) {
        triangulo.removeClass("triangulosup").addClass("trianguloinf");
      } else {
        triangulo.removeClass("trianguloinf").addClass("triangulosup");
      }
    };
    scope.clickli2 = function(e) {
      var lista, seleccionado, texto, triangulo;
      texto = $(this).text();
      scope.tip_multimedia = $(this).find("a").data("id");
      $(".multimedia").fadeOut("slow", function() {
        return $("#multimedia-" + scope.tip_multimedia).fadeIn("slow");
      });
      seleccionado = $(this).parent().prev();
      lista = $(this).closest("ul");
      triangulo = $(this).parent().next();
      e.preventDefault();
      e.stopPropagation();
      seleccionado.text(texto);
      lista.hide();
      triangulo.removeClass("triangulosup").addClass("trianguloinf");
    };
    scope.clickli3 = function(e) {
      var lista, seleccionado, texto, triangulo;
      texto = $(this).text();
      scope.tip_multimedia = $(this).find("a").data("id");
      $(".multimedia3").fadeOut("slow", function() {
        return $("#multimedia3-" + scope.tip_multimedia).fadeIn("slow");
      });
      seleccionado = $(this).parent().prev();
      lista = $(this).closest("ul");
      triangulo = $(this).parent().next();
      e.preventDefault();
      e.stopPropagation();
      seleccionado.text(texto);
      lista.hide();
      triangulo.removeClass("triangulosup").addClass("trianguloinf");
    };
    scope.clickli = function(e) {
      var lista, seleccionado, texto, triangulo;
      texto = $(this).text();
      scope.categoria = $(this).find("a").data("id");
      seleccionado = $(this).parent().prev();
      lista = $(this).closest("ul");
      triangulo = $(this).parent().next();
      e.preventDefault();
      e.stopPropagation();
      seleccionado.text(texto);
      lista.hide();
      triangulo.removeClass("triangulosup").addClass("trianguloinf");
    };
    scope.categoria = function(id) {
      var data, result, url;
      data = {
        codigo: id
      };
      url = './controller/noticia/categoria.php';
      result = http.post(url, data);
      result.success(function(response) {
        scope.listcat = response.categoria;
      });
      result.error(function(error) {});
    };
    scope.listarGaleria = function() {
      var data, result, url;
      data = {
        codigo: scope.codigo
      };
      url = './controller/noticia/galeria.php';
      result = http.post(url, data);
      result.success(function(response) {
        scope.listgal = response['listgal'];
        console.log(response);
      });
      result.error(function(error) {
        console.log(error);
      });
    };
    scope.detalle = function() {
      var data, result, url;
      data = {
        codigo: scope.codigo
      };
      url = './controller/noticia/detalle.php';
      result = http.post(url, data);
      result.success(function(response) {
        var $fileupload;
        scope.form = response[0];
        scope.checkboxModel.value1 = scope.form.estado;
        scope.checkboxDestacado.value1 = scope.form.destacado;
        scope.codigo = scope.form.codigo;
        scope.categoria = scope.form.categoria;
        scope.namecategoria = scope.form.namecategoria;
        scope.checkboxDestacado.value1 = scope.form.destacado;
        $fileupload = $('#file_portada');
        $fileupload.wrap('<form>').closest('form').get(0).reset();
        $fileupload.unwrap();
      });
      result.error(function(error) {
        console.log(error);
      });
    };
    scope.detalle_en = function() {
      var data, result, url;
      data = {
        codigo: scope.codigo
      };
      url = './controller/noticia/detalle_en.php';
      result = http.post(url, data);
      result.success(function(response) {
        var $fileupload;
        console.log(response);
        scope.form_en = response[0];
        scope.checkboxModel_en.value1 = scope.form.estado;
        scope.checkboxDestacado_en.value1 = scope.form.destacado;
        scope.codigo = scope.form.codigo;
        scope.categoria = scope.form.categoria;
        scope.namecategoria_en = scope.form.namecategoria;
        scope.checkboxDestacado_en.value1 = scope.form.destacado;
        $fileupload = $('#file_portada_en');
        $fileupload.wrap('<form>').closest('form').get(0).reset();
        $fileupload.unwrap();
      });
      result.error(function(error) {
        console.log(error);
      });
    };
    scope.eliminar = function(id) {
      var data, result, url;
      data = {
        codigo: id
      };
      url = './controller/noticia/eliminar-galeria.php';
      result = http.post(url, data);
      result.success(function(response) {
        alert("Se eliminó correctamente");
        scope.listarGaleria();
      });
      result.error(function(error) {
        console.log(error);
      });
    };
    $("#categoria").click(scope.clickcaja);
    $("#categoria").on("click", "li", scope.clickli);
    $("#tipomultimedia").click(scope.clickcaja);
    $("#tipomultimedia").on("click", "li", scope.clickli2);
    $("#tipomultimedia2").click(scope.clickcaja);
    $("#tipomultimedia2").on("click", "li", scope.clickli3);
    scope.detalle();
    scope.detalle_en();
    scope.categoria(-1);
    timeout(scope.setup, 500);
  }
]);

app.controller('listarNoticiaCrtl', [
  '$scope', '$http', '$timeout', '$rootScope', '$cookieStore', '$location', 'AuthenticationService', function(scope, http, timeout, rootScope, cookieStore, location, AuthenticationService) {
    scope.form = [];
    scope.form = {};
    scope.datos = [];
    scope.datos = {};
    scope.range = [];
    scope.numpage = 1;
    scope.listar = function(page, filtro) {
      var data, result, url;
      data = {
        page: page,
        filtro: filtro
      };
      url = './controller/noticia/listar.php';
      result = http.post(url, data);
      result.success(function(response) {
        var i, total;
        if (response !== "false") {
          scope.datos = response['listado'];
          i = 0;
          total = response['paginado'].total_paginas;
          while (i < total) {
            scope.range.push(i);
            i++;
          }
        } else {
          scope.datos = {};
        }
      });
      result.error(function(error) {
        console.log(error);
      });
    };
    scope.buscar = function(data) {
      scope.range = [];
      scope.listar(scope.numpage, data.buscarArt);
    };
    scope.agregar = function() {
      cookieStore.put('codigo', -1);
      cookieStore.put('nom_accion', "Agregar");
      location.path('/noticia/formulario/');
    };
    scope.cambiarEstado = function(estado, id) {
      var data, result, url;
      data = {
        codigo: id,
        valor: estado,
        variable: 'estado'
      };
      url = './controller/noticia/act_listado.php';
      result = http.post(url, data);
      result.success(function(response) {
        scope.range = [];
        scope.listar(scope.numpage, '');
        scope.form.buscarArt = "";
      });
      result.error(function(error) {
        console.log(error);
      });
    };
    scope.cambiarDestacado = function(destacado, id) {
      var data, result, url;
      data = {
        codigo: id,
        valor: destacado,
        variable: 'destacado'
      };
      url = './controller/noticia/act_listado.php';
      result = http.post(url, data);
      result.success(function(response) {
        scope.range = [];
        scope.listar(scope.numpage, '');
        scope.form.buscarArt = "";
      });
      result.error(function(error) {
        console.log(error);
      });
    };
    scope.editar = function(id) {
      cookieStore.put('codigo', id);
      cookieStore.put('nom_accion', "Editar");
      location.path('/noticia/formulario/');
    };
    scope.eliminar = function(id) {
      var data, result, url;
      data = {
        codigo: id
      };
      url = './controller/noticia/eliminar.php';
      result = http.post(url, data);
      result.success(function(response) {
        alert("Se eliminó correctamente");
        scope.range = [];
        scope.listar(scope.numpage, '');
        scope.form.buscarArt = "";
      });
      result.error(function(error) {
        console.log(error);
      });
    };
    scope.paginar = function(page) {
      scope.range = [];
      scope.listar(page, '');
    };
    scope.order = function(e, order, id) {
      var data, result, url;
      if (e.which === 13) {
        data = {
          codigo: id,
          valor: order,
          variable: 'order'
        };
        url = './controller/noticia/act_listado.php';
        result = http.post(url, data);
        result.success(function(response) {
          scope.range = [];
          scope.listar(scope.numpage, '');
          scope.form.buscarArt = "";
          alert("Se actualizo");
        });
        result.error(function(error) {
          console.log(error);
        });
      }
    };
    scope.listar(scope.numpage, '');
  }
]);

app.controller('miusuarioCrtl', [
  '$scope', '$http', '$timeout', '$rootScope', '$routeParams', '$cookieStore', '$location', 'AuthenticationService', function(scope, http, timeout, rootScope, routeParams, cookieStore, location2, AuthenticationService) {
    scope.fechaactual = "";
    scope.dameFechaActual = function() {
      var diasSemana, f, meses;
      meses = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
      diasSemana = new Array('Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado');
      f = new Date;
      scope.fechaactual = diasSemana[f.getDay()] + ', ' + f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear();
      console.log(scope.fechaactual);
    };
    scope.salirAdmin = function() {
      var result, url;
      url = './controller/usuario/salir.php';
      result = http.post(url);
      result.success(function(response) {
        location2.path('/login');
      });
      result.error(function(error) {
        console.log(error);
      });
    };
    scope.editarmiUser = function() {
      var result, url;
      url = './controller/usuario/miuser.php';
      result = http.post(url);
      result.success(function(response) {
        cookieStore.put('codigo', response.id);
        cookieStore.put('nom_accion', "Editar");
        cookieStore.put('miform', 1);
        location2.path('/usuario/formulario/');
      });
      result.error(function(error) {
        console.log(error);
      });
    };
    scope.dameFechaActual();
  }
]);

app.controller('editarUsuarioCrtl', [
  '$scope', '$http', '$timeout', '$rootScope', '$routeParams', '$cookieStore', '$location', 'AuthenticationService', function(scope, http, timeout, rootScope, routeParams, cookieStore, location2, AuthenticationService) {
    if (cookieStore.get('codigo')) {
      scope.codigo = cookieStore.get('codigo');
    } else {
      scope.codigo = -1;
    }
    if (cookieStore.get('nom_accion')) {
      scope.nom_accion = cookieStore.get('nom_accion');
    } else {
      scope.nom_accion = "";
    }
    scope.miform = cookieStore.get('miform');
    scope.rutaBrench = "";
    scope.form = [];
    scope.form = {};
    scope.class_mess = "";
    scope.tipouser = 0;
    scope.nametipouser = 0;
    scope.checkboxModel = {
      value1: true
    };
    scope.checkboxSexo = {
      value1: false
    };
    scope.formData = new FormData();
    scope.rutaImg = "resources/assets/image/usuario/";
    scope.url = "controller/usuario/procesar.php";
    scope.borrarMensaje = function() {
      $(".inner-alert").fadeOut("slow");
    };
    scope.mostrarError = function() {
      if (scope.class_mess === "exito") {
        if ($(".inner-alert .alert").hasClass("error")) {
          $(".inner-alert .alert").removeClass("error");
          $(".inner-alert .alert").addClass(scope.class_mess);
        }
      } else {
        if ($(".inner-alert .alert").hasClass("exito")) {
          $(".inner-alert .alert").removeClass("exito");
          $(".inner-alert .alert").addClass(scope.class_mess);
        }
      }
      $(".inner-alert").fadeIn("slow");
      timeout(scope.borrarMensaje, 3000);
    };
    scope.setup = function() {
      scope.editorOptions = {
        language: 'ru'
      };
      scope.$on("ckeditor.ready", function(event) {
        scope.isReady = true;
      });
      $(".cke_contents").css("height", "200");
      scope.validacion();
    };
    scope.validacion = function() {
      jQuery.validator.addMethod("reservaDate", function(value, element) {
        return value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
      });
      $("#formuser").validate({
        rules: {
          nombre: "required",
          usuario: "required",
          a_paterno: "required",
          movil: "required",
          comentario: "required",
          email: {
            required: true,
            email: true
          },
          password: "required",
          password2: {
            equalTo: "#password"
          }
        },
        messages: {
          nombre: "Ingrese su nombre",
          apellido: "Ingrese un correo válido",
          celular: "Ingrese su mensaje",
          email: "Ingrese su email",
          comentario: "Ingrese su comentario"
        }
      });
    };
    scope.procesarForm = function(data) {
      if ($("#formuser").valid()) {
        scope.formData.append("nombre", data.nombre);
        scope.formData.append("a_paterno", data.a_paterno);
        scope.formData.append("a_materno", data.a_materno);
        scope.formData.append("email", data.email);
        scope.formData.append("movil", data.movil);
        scope.formData.append("telefono", data.telefono);
        scope.formData.append("usuario", data.usuario);
        scope.formData.append("password", data.password);
        scope.formData.append("password2", data.password2);
        scope.formData.append("file_portada", $("#file_portada")[0].files[0]);
        scope.formData.append("act_img_portada", scope.form.act_img_portada);
        scope.formData.append("tipouser", scope.tipouser);
        scope.formData.append("acceso", scope.checkboxModel.value1);
        scope.formData.append("sexo", scope.checkboxSexo.value1);
        scope.formData.append("codigo", scope.codigo);
        $.ajax({
          url: scope.url,
          type: "post",
          dataType: "html",
          data: scope.formData,
          cache: false,
          contentType: false,
          processData: false
        }).done(function(res, status) {
          var response;
          console.log(res);
          response = JSON.parse(res);
          console.log(response);
          if (response.success) {
            scope.codigo = response.codigo;
            scope.nom_accion = "Editar";
            cookieStore.put('codigo', scope.codigo);
            cookieStore.put('nom_accion', "Editar");
            timeout(scope.detalle, 1500);
          }
          $(".inner-alert .alert p").html("<strong>" + response.message + "</strong>");
          scope.class_mess = response.class_mess;
          scope.mostrarError();
        });
      } else {
        $(".inner-alert .alert p").html("<strong>Debe completar los campos obligatorios</strong>");
        scope.class_mess = "error";
        scope.mostrarError();
      }
    };
    scope.activarCaja = function(cod, name, cajaId) {
      var seleccionado;
      seleccionado = $("#" + cajaId + " .seleccionado");
      seleccionado.text(name);
    };
    scope.clickcaja = function(e) {
      var lista, triangulo;
      lista = $(this).find("ul");
      triangulo = $(this).find("span:last-child");
      e.preventDefault();
      $(this).find("ul").toggle();
      if (lista.is(":hidden")) {
        triangulo.removeClass("triangulosup").addClass("trianguloinf");
      } else {
        triangulo.removeClass("trianguloinf").addClass("triangulosup");
      }
    };
    scope.clickli = function(e) {
      var lista, seleccionado, texto, triangulo;
      texto = $(this).text();
      scope.tipouser = $(this).find("a").data("id");
      seleccionado = $(this).parent().prev();
      lista = $(this).closest("ul");
      triangulo = $(this).parent().next();
      e.preventDefault();
      e.stopPropagation();
      seleccionado.text(texto);
      lista.hide();
      triangulo.removeClass("triangulosup").addClass("trianguloinf");
    };
    scope.detalle = function() {
      var data, result, url;
      data = {
        codigo: scope.codigo
      };
      url = './controller/usuario/detalle.php';
      result = http.post(url, data);
      result.success(function(response) {
        var $fileupload;
        scope.form = response[0];
        if (scope.form.acceso === "1") {
          scope.checkboxModel.value1 = true;
        } else {
          scope.checkboxModel.value1 = false;
        }
        if (scope.form.sexo === "1") {
          scope.checkboxSexo.value1 = true;
        } else {
          scope.checkboxSexo.value1 = false;
        }
        scope.codigo = scope.form.codigo;
        scope.tipouser = scope.form.tipouser;
        scope.nametipouser = scope.form.nametipouser;
        scope.rutaBrench = scope.form.rutaBrench;
        $fileupload = $('#file_portada');
        $fileupload.wrap('<form>').closest('form').get(0).reset();
        $fileupload.unwrap();
        scope.activarCaja(scope.tipouser, scope.nametipouser, "tipouser");
      });
      result.error(function(error) {
        console.log(error);
      });
    };
    scope.detalle2 = function() {
      var data, result, url;
      data = {
        codigo: scope.codigo
      };
      url = './controller/usuario/midetalle.php';
      result = http.post(url, data);
      result.success(function(response) {
        var $fileupload;
        scope.form = response[0];
        if (scope.form.acceso === "1") {
          scope.checkboxModel.value1 = true;
        } else {
          scope.checkboxModel.value1 = false;
        }
        if (scope.form.sexo === "1") {
          scope.checkboxSexo.value1 = true;
        } else {
          scope.checkboxSexo.value1 = false;
        }
        scope.codigo = scope.form.codigo;
        scope.tipouser = scope.form.tipouser;
        scope.nametipouser = scope.form.nametipouser;
        scope.rutaBrench = scope.form.rutaBrench;
        $fileupload = $('#file_portada');
        $fileupload.wrap('<form>').closest('form').get(0).reset();
        $fileupload.unwrap();
        scope.activarCaja(scope.tipouser, scope.nametipouser, "tipouser");
      });
      result.error(function(error) {
        console.log(error);
      });
    };
    $("#tipouser").click(scope.clickcaja);
    $("#tipouser").on("click", "li", scope.clickli);
    if (scope.miform === 1) {
      scope.detalle2();
    } else {
      scope.detalle();
    }
    timeout(scope.setup, 500);
  }
]);

app.controller('listarUsuarioCrtl', [
  '$scope', '$http', '$timeout', '$rootScope', '$cookieStore', '$location', 'AuthenticationService', function(scope, http, timeout, rootScope, cookieStore, location, AuthenticationService) {
    scope.form = [];
    scope.form = {};
    scope.datos = [];
    scope.datos = {};
    scope.range = [];
    scope.numpage = 1;
    scope.listar = function(page, filtro) {
      var data, result, url;
      data = {
        page: page,
        filtro: filtro
      };
      url = './controller/usuario/listar.php';
      result = http.post(url, data);
      result.success(function(response) {
        var i, total;
        if (response !== "false") {
          scope.datos = response['usuario'];
          i = 0;
          total = response['paginado'].total_paginas;
          while (i < total) {
            scope.range.push(i);
            i++;
          }
        } else {
          scope.datos = {};
        }
      });
      result.error(function(error) {
        console.log(error);
      });
    };
    scope.buscar = function(data) {
      scope.range = [];
      scope.listar(scope.numpage, data.buscarArt);
    };
    scope.agregar = function() {
      cookieStore.put('codigo', -1);
      cookieStore.put('nom_accion', "Agregar");
      cookieStore.put('miform', 0);
      location.path('/usuario/formulario/');
    };
    scope.cambiarEstado = function(estado, id) {
      var data, result, url;
      data = {
        codigo: id,
        valor: estado,
        variable: 'acceso'
      };
      url = './controller/usuario/act_listado.php';
      result = http.post(url, data);
      result.success(function(response) {
        scope.range = [];
        scope.listar(scope.numpage, '');
        scope.form.buscarArt = "";
      });
      result.error(function(error) {
        console.log(error);
      });
    };
    scope.editar = function(id) {
      cookieStore.put('codigo', id);
      cookieStore.put('nom_accion', "Editar");
      cookieStore.put('miform', 0);
      location.path('/usuario/formulario/');
    };
    scope.eliminar = function(id) {
      var data, result, url;
      data = {
        codigo: id
      };
      url = './controller/usuario/eliminar.php';
      result = http.post(url, data);
      result.success(function(response) {
        alert("Se eliminó correctamente");
        scope.range = [];
        scope.listar(scope.numpage, '');
        scope.form.buscarArt = "";
      });
      result.error(function(error) {
        console.log(error);
      });
    };
    scope.paginar = function(page) {
      scope.range = [];
      scope.listar(page, '');
    };
    scope.listar(scope.numpage, '');
  }
]);