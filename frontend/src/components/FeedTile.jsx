import * as React from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export default function FeedTile({ title, description, media, views, drag, onClick }) {
  return (
    <Card onClick={onClick} ref={drag} sx={{ maxWidth: '30%' }}>
      <CardMedia component="img" alt="placeholder" height="240" image={media} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="body2" color="text.secondary">
          {views} views
        </Typography>
        {/* <Button size="small">Share</Button> */}
      </CardActions>
    </Card>
  );
}

FeedTile.propTypes = {
  title: 'string',
  description: 'string',
  media: 'string',
  views: 'number',
  drag: 'function',
  onClick: 'function',
};
