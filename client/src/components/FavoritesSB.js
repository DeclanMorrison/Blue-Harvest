import React from "react";
import { Snackbar, Zoom, Tooltip} from "@material-ui/core";
import StarIcon from "@material-ui/icons/StarRateRounded";

class FavoritesSB extends React.Component {
  state = {
    open: false,
    vertical: "top",
    horizontal: "center"
  };

  handleClick = state => () => {
    console.log("Snack should show now...");
    this.setState({ open: true, ...state });
    this.props.handleAddToFavorites(
      this.props.hit.recipe.label,
      this.props.hit.recipe.image,
      this.props.hit.recipe.url,
      this.props.hit.recipe.ingredients
    )
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        <Tooltip TransitionComponent={Zoom} title="Add to Favorites">
          <StarIcon onClick={this.handleClick({ vertical: "top", horizontal: "center" })}
          />
        </Tooltip>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              {this.props.hit.recipe.label} added to favorites
            </span>
          }
        />
      </div>
    );
  };
};

export default FavoritesSB;
