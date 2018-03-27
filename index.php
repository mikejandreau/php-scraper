<?php 
include_once('assets/inc/simple_html_dom.php');


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>PHP Scraper Test</title>
    <link href="assets/css/style.min.css" rel="stylesheet">
</head>
<body id="page-top">
    <nav class="navbar navbar-default" role="navigation">
        <div class="container">
            <a class="navbar-brand page-scroll" href="/">PHP Scraper Test</a>
        </div>
    </nav>

    <section id="intro" class="intro-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">

<h1>PHP Scraper Test</h1>
<hr>

<?php 
$searchString = "Chapman Guitars";
$in = $searchString;
$in = str_replace(' ','+',$in); // space is a +
$url  = 'http://www.google.com/search?hl=en&tbo=d&site=&source=hp&q='.$in.'&oq='.$in.'';

echo '<h2>Title: ' . $searchString . '</h2>';
echo '<span>Title: ' . $url . '<span><hr>';

$html = file_get_html($url);

$i=0;
$linkObjs = $html->find('h3.r a'); 
foreach ($linkObjs as $linkObj) {
    $title = trim($linkObj->plaintext);
    $link  = trim($linkObj->href);

    // if it is not a direct link but url reference found inside it, then extract
    if (!preg_match('/^https?/', $link) && preg_match('/q=(.+)&amp;sa=/U', $link, $matches) && preg_match('/^https?/', $matches[1])) {
        $link = $matches[1];
    } else if (!preg_match('/^https?/', $link)) { // skip if it is not a valid link
        continue;
    }

    $descr = $html->find('span.st',$i); // description is not a child element of H3 thereforce we use a counter and recheck.
    $i++;   
    echo '<p>Title: ' . $title . '<br />';
    echo 'Link: <a href="' . $link . '" target="_blank">Read More</a><br />';
    echo 'Description: ' . $descr . '</p><hr>';
}
?>




                </div>
            </div>
        </div>
    </section>
    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
</body>
</html>
