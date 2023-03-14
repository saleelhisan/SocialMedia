import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import React from 'react';

const Notifications = () => {


    return (
        <Box flex={4}>
            <Card sx={{
                boxShadow: `-1px 6px 5px 3px rgba(0,0,0,0.25)`,
                height: "90vh",
                width: "98%"
            }} >
                <Box sx={{
                    textAlign: "center"
                }}>
                    <Typography variant="h6" component="h1" >
                        Notifications
                    </Typography>
                </Box>
                <Box>
                    <Box >
                        <List dense sx={{
                            bgcolor: 'background.paper',
                            maxHeight: "80vh",
                            overflowY: "scroll",
                            "&::-webkit-scrollbar": {
                                display: "none"
                            }
                        }}>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => {
                                return (
                                    <ListItem
                                        key={value}
                                        sx={{
                                            marginBottom:"0.5rem"
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={`Avatar n°${value + 1}`}
                                                    src={`/static/images/avatar/${value + 1}.jpg`}
                                                />
                                            </ListItemAvatar>
                                            <Typography variant="p" fontWeight={600}>
                                                User Name
                                            </Typography>
                                            <Box marginLeft="1rem">
                                            <Typography variant="p" >
                                                Started Following you
                                                </Typography>
                                            </Box>
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}

export default Notifications
