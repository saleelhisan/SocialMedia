import Card from '@mui/material/Card';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import StoryView from '../StoryView/StoryView';
import { useState } from 'react';
import AddStory from '../AddStory/AddStory';


const Stories = () => {

    const [openStory, setOpenSory] = useState(false)
    const [index, setIndex] = useState(0)

    const stories = [
        {
            id: 1,
            name: "John Doe",
            url: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 2,
            name: "John Doe",
            url: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 3,
            name: "John Doe",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 4,
            name: "John Doe",
            url: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 5,
            name: "John Doe",
            url: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 6,
            name: "John Doe",
            url: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 7,
            name: "John Doe",
            url: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 8,
            name: "John Doe",
            url: "https://www.cristianoronaldo.com/assets/images/brand_eyewear.jpg?832236",
        },
    ];
    

    return (
        <Card>
            <ImageList sx={{
                overflowX: 'auto',
                "&::-webkit-scrollbar": {
                    display: "none"
                }
            }} rowHeight={200}>
                <ImageListItem sx={{
                    display: 'flex', flexDirection: 'row',
                }}>
                    <img
                        src="https://www.cristianoronaldo.com/assets/images/brand_eyewear.jpg?832236"
                        alt='title'
                        loading='lazy'
                        style={{ paddingRight: '1em', position:"relative", cursor:"pointer" }}
                    />
                    <AddStory/>
                    {stories.map(image => {
                        return (
                            <img
                                key={image.id}
                                src={image.url}
                                alt='title'
                                loading='lazy'
                                onClick={e =>{ setOpenSory(true); setIndex(image.id)}}
                                style={{ paddingRight: '1em', cursor: "pointer" }}
                            />
                        )
                    })}

                    <StoryView open={openStory} setOpen={setOpenSory} stories={stories} index={index} />
                </ImageListItem>
            </ImageList>
        </Card>
           
  
    );
}

export default Stories