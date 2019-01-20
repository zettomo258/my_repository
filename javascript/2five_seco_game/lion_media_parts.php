
  <div class="categoryBox<?php if(get_option('fit_skin_base') != 'value2' ):?> categoryBox-gray<?php endif; ?>">

    <div class="container">

      <h2 class="heading heading-primary">
        <span class="heading__bg u-txtShdw bgc<?php if (isset($cat_meta[$cat_id])) { echo esc_html($cat_meta[$cat_id]);} ?>"><?php echo $cat_name; ?></span>カテゴリの最新記事
      </h2>

      <ul class="categoryBox__list">
        <?php query_posts('cat='.$cat_id.'&posts_per_page=6'); ?>
        <?php if (have_posts()) : while (have_posts()) : the_post();
		// icatchサイズの画像内容を取得
		$thumbnail_id = get_post_thumbnail_id();
		$icatch_img = wp_get_attachment_image_src( $thumbnail_id , 'icatch' );
		// アイキャッチ画像出力
		$src = $icatch_img[0];
		$width = $icatch_img[1];
		$height = $icatch_img[2];
		?>
        <li class="categoryBox__item">

          <div class="eyecatch eyecatch-archive">
            <a href="<?php the_permalink(); ?>">
              <?php if(has_post_thumbnail()) : ?>
		        <?php if($myAmp){echo '<amp-img layout="responsive"';}else{echo '<img';} ?> src="<?php echo $src; ?>" alt="<?php the_title(); ?>" width="<?php echo $width; ?>" height="<?php echo $height; ?>" ><?php if($myAmp){echo '</amp-img>';}?>
		      <?php else :?>
                <?php if($myAmp){echo '<amp-img layout="responsive"';}else{echo '<img';} ?> src="<?php echo get_template_directory_uri(); ?>/img/img_no.gif" alt="NO IMAGE" width="730" height="410" ><?php if($myAmp){echo '</amp-img>';}?>
		      <?php endif; ?>
            </a>
          </div>

          <?php if (get_option('fit_post_time') != 'value2' || has_tag() == true ) :?>
          <ul class="dateList dateList-archive">
            <?php if (get_option('fit_post_time') != 'value2' ) :	?>
            <li class="dateList__item icon-calendar"><?php the_time('Y.m.d'); ?></li>
            <?php endif; ?>
            <?php if(has_tag()==true) :  ?>
            <li class="dateList__item icon-tag"><?php
		    if (get_option('fit_theme_tagNumber')){
			    $number = get_option('fit_theme_tagNumber');
		    }else{
			    $number = '5';
		    }
            $posttags = get_the_tags();
		    $count = '0';
		    foreach($posttags as $tag) {
			    $count++;
			    if ($count > $number) break;
			    echo '<a href="'. get_tag_link($tag->term_id) .'" rel="tag">'. $tag->name ."</a><span>, </span>";
		    }
		    ?></li>
            <?php endif; ?>
          </ul>
          <?php endif; ?>

          <h2 class="heading heading-archive ">
            <a class="hc<?php if (isset($cat_meta[$cat_id])) { echo esc_html($cat_meta[$cat_id]);} ?>" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
          </h2>

        </li>
        <?php endwhile; endif; wp_reset_query(); ?>
      </ul>
    </div>
  </div>
