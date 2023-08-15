import {
    Box,
    Card,
    CardActions,
    CardContent,
    Link,
    Typography,
} from "@mui/material";
import Button from "@mui/material/Button";

const Home = () => {
    return (
        <Box mt={2} ml={2}>
            <Card variant="outlined" sx={{ maxWidth: 275 }}>
                <CardContent>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        Word of the Day
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href="/fridge" size="small">Ingredient List</Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default Home;
