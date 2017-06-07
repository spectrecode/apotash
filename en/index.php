<?php 
include('./config/conexion.php');
include('./modelo/funciones.php');
include('./modelo/usuario.php');
include('./modelo/url.php');
include('./modelo/noticia.php');

$objnot 	= new Noticia();
$datanot 	= $objnot->dameListadoDestacado();

$item 		= count($datanot) - 1;
$objfunc 	= new misFunciones();
$html_destacado = "";
for($i=0; $i<=$item; $i++){
	$contItem++;
	$data 	= $datanot[$i];
	$titulo = $data['art_nombre'];
	$data['art_descripsuperior'] = $objfunc->convertir_html($data['art_descripsuperior']);
	$descripsuperior = $data['art_descripsuperior'];
	$sumilla			 = $data['art_frase']; 	
	$seo_url			= "./news/".$data['seo_url'];
	$imgportada 		= $data['art_imgportada'];
	
	$imggrande		= $data['art_imggrande'];
	$video			= $data['art_video'];
	
	$html_destacado.= "<li>";
	$html_destacado.= "<a href='".$seo_url."'>";
	$html_destacado.= "<img class='notiImg' src='"._URLIMG_."admin-american/resources/assets/image/noticias/".$imgportada."' alt='' width='100%'>";
	$html_destacado.= "<div class='caja-hover-not'>";
	$html_destacado.= "<p class='titular text-center'>".$titulo."</p>";
	$html_destacado.= "<div class='noticia text-center'>";
	$html_destacado.= "<p>".$sumilla."</p>";
	$html_destacado.= "<a href='".$seo_url."'><i class='icon-eye'><span>Ver más</span></i></a>";
	$html_destacado.= "</div>";
	$html_destacado.= "</div>";
	$html_destacado.= "</a>";
	$html_destacado.= "<div class='descrip-img-noticias hidden-lg'>";
	$html_destacado.= "<a href='".$seo_url."'>";
	$html_destacado.= "<p> ".$titulo."</p>";
	$html_destacado.= "</a>";
	$html_destacado.= "</div>";
	$html_destacado.= "</li>";

}

/**Noticia destacada **/
$html_new_destacado = "";
$html_new_destacado.= "<div class='row noticia-destacada hidden-md hidden-lg'>";
$html_new_destacado.= "<a href='./news/".$datanot[0]['seo_url']."'>";
$html_new_destacado.= "<img src='"._URLIMG_."admin-american/resources/assets/image/noticias/".$datanot[0]['art_imgportada']."' alt='' width='100%'>";
$html_new_destacado.= "<div class='descrip-img-noticias'>";
$html_new_destacado.= "<p>".$datanot[0]['art_nombre']."'</p>";
$html_new_destacado.= "</div>";
$html_new_destacado.= "</a>";
$html_new_destacado.= "</div>";

?>
<!DOCTYPE html>
<html lang="es" ng-app="Ohemedical">

<head>
    <title>Américas Potash</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="./resources/assets/css/lightslider.css">
    <link href="./resources/assets/css/jquery.fancybox.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./resources/assets/css/font.css">
    <link href="./resources/assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="./resources/assets/css/app.css" rel="stylesheet">
    <link rel="apple-touch-icon" sizes="57x57" href="./resources/assets/image/favicon_1/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="./resources/assets/image/favicon_1/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="./resources/assets/image/favicon_1/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="./resources/assets/image/favicon_1/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="./resources/assets/image/favicon_1/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="./resources/assets/image/favicon_1/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="./resources/assets/image/favicon_1/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="./resources/assets/image/favicon_1/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="./resources/assets/image/favicon_1/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="./resources/assets/image/favicon_1/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./resources/assets/image/favicon_1/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="./resources/assets/image/favicon_1/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./resources/assets/image/favicon_1/favicon-16x16.png">
    <link rel="manifest" href="./resources/assets/image/favicon_1/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <meta name="format-detection" content="telephone=no">
</head>

<body class="no-scroll" ng-view>
    <header class="header" ng-controller="headerCrtl">
        <div class="container">
            <div class="logo-max hidden-md hidden-lg"><a href="http://americas-potash.com/en"><img src="./resources/assets/image/logo-trans.png" id="logo-apM" alt="" width="100%"></a>
                <div class="box-burguer">
                    <div id="box-search"><img src="./resources/assets/image/lupa.png" width="40px" alt=""></div><a class="line-burguer"></a></div>
            </div>
            <div class="row">
                <div class="col-lg-2 col-md-2 logo-header hidden-sm hidden-xs"><a href="http://americas-potash.com/en"><img src="./resources/assets/image/logo-trans.png" id="logo-ap" alt="" width="100%"></a></div>
                <div class="col-lg-9 col-md-9 visible-md visible-lg-inline-block">
                    <nav class="menu-header">
                        <ul>
                            <li><a class="active" href="http://americas-potash.com/en">Home</a></li>
                            <li class="subNos"><a href="javascript:void(0)">About Us<span> &#9660;</span></a>
                                <ul class="submenu-header">
                                    <li><a href="http://americas-potash.com/en/About_Us">Who We Are</a></li>
                                    <li><a href="http://americas-potash.com/en/Mission_and_Vision">Mission and Vision</a></li>
                                    <li><a href="http://americas-potash.com/en/Values">Values</a></li>
                                    <li><a href="http://americas-potash.com/en/Human_Talent">Human Talent </a></li>
                                </ul>
                            </li>
                            <li class="subProy"><a href="javascript:void(0)">Projects<span> &#9660;</span></a>
                                <ul class="submenu-header">
                                    <li><a href="http://americas-potash.com/en/Phosphates">Phosphates</a></li>
                                    <li><a href="http://americas-potash.com/en/Brine">Brines</a></li>
                                </ul>
                            </li>
                            <li class="subSost"><a href="javascript:void(0)">Sustainability<span> &#9660;</span></a>
                                <ul class="submenu-header">
                                    <li><a href="http://americas-potash.com/en/Sustainability">Social Responsability</a></li>
                                    <li><a href="http://americas-potash.com/en/Health">Health, Safety and Environment</a></li>
                                </ul>
                            </li>
                            <li><a href="http://americas-potash.com/en/Corporate_Communication">Corporate Communication</a></li>
                            <li><a href="http://americas-potash.com/en/Contact_Us">Contact Us</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 visible-md visible-lg-inline-block">
                    <div class="box-search" id="box-search">
                        <div><a href="http://americas-potash.com">Español</a><span> /</span><a class="active" href="http://americas-potash.com/en">English</a></div><img src="./resources/assets/image/lupa.png" width="40px" alt=""></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="container-fluid">
                <div class="row hidden-md hidden-lg">
                    <nav class="menu-collapse">
                        <ul class="menu-collapse text-center">
                            <li><a href="http://americas-potash.com/en">Home</a></li>
                            <li class="sMenuNosotros"><a href="javascript:void(0)">About Us</a>
                                <ul class="submenu-movil">
                                    <li><a href="http://americas-potash.com/en/About_Us">Who We Are</a></li>
                                    <li><a href="http://americas-potash.com/en/Mission_and_Vision">Mission and Vision</a></li>
                                    <li><a href="http://americas-potash.com/en/Values">Values</a></li>
                                    <li><a href="http://americas-potash.com/en/Human_Talent">Human Talent</a></li>
                                </ul>
                            </li>
                            <li class="sMenuProy"><a href="javascript:void(0)">Projects</a>
                                <ul class="submenu-movil">
                                    <li><a href="http://americas-potash.com/en/Phosphates">Phosphates</a></li>
                                    <li><a href="http://americas-potash.com/en/Brine">Brine</a></li>
                                </ul>
                            </li>
                            <li class="sMenuSostenibilidad"><a href="javascript:void(0)">Sustainability</a>
                                <ul class="submenu-movil">
                                    <li><a href="http://americas-potash.com/en/Sustainability">Social Responsability</a></li>
                                    <li><a href="http://americas-potash.com/en/Health">Health, Safety and Environment</a></li>
                                </ul>
                            </li>
                            <li> <a href="http://americas-potash.com/en/Corporate_Communication">Corporate Communication</a></li>
                            <li><a href="http://americas-potash.com/en/Contact_Us">Contact Us</a></li>
                            <ul class="idiomas">
                                <li><a href="http://americas-potash.com">Español</a></li>
                                <li><a class="activeIdioma" href="http://americas-potash.com/en">English</a></li>
                            </ul>
                        </ul>
                    </nav>
                </div><input class="style-box-search disp-none" type="text" id="busqueda" name="search" placeholder="Search..." autofocus></div>
        </div>
    </header>
    <section id="banner">
        <div class="container-fluid">
            <div class="row contenedor-banner">
                <ul class="banner">
                    <li><img class="banner-movilGrande" src="./resources/assets/image/banner-fosfato.jpg" alt=""><img class="banner-movil" src="./resources/assets/image/banner-movilFos.jpg" alt="" width="100%">
                        <div class="letrero-banner">
                            <div>
                                <h2>Helping to feed the world</h2>
                                <div class="rectangle">The consumption of potash and phosphate fertilizers has increased along with food production.</div>
                            </div>
                        </div>
                    </li>
                    <li><img class="banner-movilGrande" src="./resources/assets/image/banner-labrador.jpg" alt=""><img class="banner-movil" src="./resources/assets/image/banner-movilLabrador.jpg" alt="" width="100%">
                        <div class="letrero-banner">
                            <div>
                                <h2>Enriching the Earth</h2>
                                <div class="rectangle">We will produce phosphate and potash fertilizers.</div>
                            </div>
                        </div>
                    </li>
                    <li><img class="banner-movilGrande" src="./resources/assets/image/banner-salmuera.jpg" alt=""><img class="banner-movil" src="./resources/assets/image/banner-movilSalm.jpg" alt="" width="100%">
                        <div class="letrero-banner">
                            <div>
                                <h2>Caring for our environment</h2>
                                <div class="rectangle">Safe and environmentally responsible operations.</div>
                            </div>
                        </div>
                    </li>
                    <li><img class="banner-movilGrande" src="./resources/assets/image/banner-creciendo.jpg" alt=""><img class="banner-movil" src="./resources/assets/image/banner-movilStn.jpg" alt="" width="100%">
                        <div class="letrero-banner">
                            <div>
                                <h2>Growing together</h2>
                                <div class="rectangle">For the sustainable development of our environment.</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    <section id="inicio">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h3>News</h3>
                    <?php echo $html_new_destacado; ?>
                    <div class="row">
                       <ul class="sliderNoticias">
                            <?php echo $html_destacado; ?>
        				</ul>
        			</div>
        		</div>
        	</div>
        <div class="row galerias">
            <div class="col-lg-12">
                <h3>Gallery</h3>
                <div class="row">
                    <ul class="sliderGaleria">
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/zoom/0382.jpg"><img class="image-click" src="./resources/assets/image/0382.jpg" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/zoom/0341.jpg"><img class="image-click" src="./resources/assets/image/0341.png" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/zoom/0419.jpg"><img class="image-click" src="./resources/assets/image/0419.jpg" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/zoom/1043.jpg"><img class="image-click" src="./resources/assets/image/1043.png" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/zoom/1126.jpg"><img class="image-click" src="./resources/assets/image/1126.png" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/zoom/1388.jpg"><img class="image-click" src="./resources/assets/image/1388.png" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/zoom/0667.png"><img class="image-click" src="./resources/assets/image/0667.png" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/zoom/0509.jpg"><img class="image-click" src="./resources/assets/image/0509.png" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/zoom/0576.jpg"><img class="image-click" src="./resources/assets/image/0576.png" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/zoom/0183.jpg"><img class="image-click" src="./resources/assets/image/0183.jpg" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/zoom/0250.jpg"><img class="image-click" src="./resources/assets/image/0250.jpg" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/zoom/0188.jpg"><img class="image-click" src="./resources/assets/image/0188.jpg" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/zoom/1333.jpg"><img class="image-click" src="./resources/assets/image/1333.jpg" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/zoom/1349.jpg"><img class="image-click" src="./resources/assets/image/1349.jpg" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/zoom/2011.jpg"><img class="image-click" src="./resources/assets/image/2011.jpg" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/zoom/1964.jpg"><img class="image-click" src="./resources/assets/image/1964.jpg" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/22_6139.jpg"><img class="image-click" src="./resources/assets/image/6139.jpg" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/5924.jpg"><img class="image-click" src="./resources/assets/image/1_5924.jpg" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/24_6289.jpg"><img class="image-click" src="./resources/assets/image/6289.jpg" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/7410.jpg"><img class="image-click" src="./resources/assets/image/1_7410.jpg" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/01_0049.jpg"><img class="image-click" src="./resources/assets/image/0049.jpg" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/02_9984.jpg"><img class="image-click" src="./resources/assets/image/9984.jpg" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/9862.png"><img class="image-click" src="./resources/assets/image/9862.png" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/5634.png"><img class="image-click" src="./resources/assets/image/5634.png" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                        <li class="example-group" data-fancybox="group" href="./resources/assets/image/05_5664.jpg"><img class="image-click" src="./resources/assets/image/5664.png" alt="" width="100%">
                            <div class="caja-hover-galeria"><i class="icon-eye"></i></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
    </section>
    <section id="contacto">
        <div class="container-fluid">
            <div class="row">
                <div class="container">
                    <div class="content-contact">
                        <div class="row">
                            <div class="contacto-titulo text-center">
                                <h2> <b>CONTACT US</b></h2>
                                <p>Let us know your comments and/or suggestions</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="box-contact">
                                    <div><i class="icon-envelope-o"></i>informes@americas-potash.com<br><br></div>
                                    <div><i class="icon-mobile"></i>933 534 107<br><br></div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <form id="formcontacto"><input type="text" placeholder="Name" name="name" id="name" required><label for="name"></label><input type="text" placeholder="Address" name="adress" id="adress" required><label for="adress"></label>
                                    <div class="duo-input">
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div class="row"><input type="text" placeholder="E-mail" name="mail" id="mail" required><label for="mail"></label></div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <div class="row"><input type="text" placeholder="Phone" name="telf" maxlength="9" id="telf" required><label for="telf"></label></div>
                                        </div>
                                    </div><textarea type="text" placeholder="Comments" name="comment" rows="6" id="comment"></textarea><button type="button" id="btn-form"><b>Send</b></button></form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="mapa">
        <div class="container-fluid">
            <div class="row">
                <div class="oficinas"><a class="lima" href="javascript:void(0)" onclick="mostrarMapa(1)">Lima</a><a class="piura" href="javascript:void(0)" onclick="mostrarMapa(2)">Piura</a></div>
                <div class="floatDirecc"><img src="./resources/assets/image/dialogo.png">
                    <div class="direccion"><i class="icon-location"></i>
                        <p id="midireccion"><b>Av. Victor Andrés Belaunde 147 </b><br>Torre Real Uno, Office 602 – San Isidro<br><b>Phone: (01) 493 4225</b><br><b>Cell: 933 534 107</b></p>
                    </div>
                </div>
            </div>
        </div>
        <div id="map"></div>
    </section>
    <footer>
        <div class="btnGoUp hidden-xs"><i class="icon-chevron-up"></i></div>
        <div class="footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 box-footer">
                        <div class="row box-logos">
                            <div><a href="http://americas-potash.com/en"><img src="./resources/assets/image/logo-potash-footer.png" alt="" width="100%"></a></div>
                            <div><a href="http://www.growmaxcorp.com/" target="_blank"><img src="./resources/assets/image/logo-growmax-footer.png" alt="" width="100%"></a></div>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12 box-footer">
                        <div class="row">
                            <div class="footer-enlaces">
                                <div><a href="http://americas-potash.com/en">Home</a><a href="http://americas-potash.com/en/About_Us">About Us</a><a href="http://americas-potash.com/en/Phosphates">Projects</a></div>
                                <div><a href="http://americas-potash.com/en/Sustainability">Sustainability</a><a href="http://americas-potash.com/en/Corporate_Communication">Corporate Communication</a><a href="http://americas-potash.com/en/Contact_Us">Contact Us</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-center">All rights reserved by <span>AMERICAS POTASH</span></p>
        </div>
    </footer>
    <div id="carga">
        <div class="bienvenida"><img src="./resources/assets/image/transparente.png">
            <p>Loading ...</p>
        </div>
    </div>
</body>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAqTeX8G5xOAMXSAgN7OjsQwSwIludCEw"></script>
<script src="./resources/assets/js/jquery-3.1.1.min.js"></script>
<script src="./resources/assets/js/jquery.validate.min.js"></script>
<script src="./resources/assets/js/jquery.fancybox.min.js"></script>
<script src="./resources/assets/js/lightslider.min.js"></script>
<script src="./resources/assets/js/validacion.js"></script>
<script src="./resources/assets/js/init.js"></script>

</html>