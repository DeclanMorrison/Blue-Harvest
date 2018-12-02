import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import StarIcon from "@material-ui/icons/StarRateRounded";
import { Zoom, Tooltip } from "@material-ui/core";

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
        {/* <Button
          onClick={this.handleClick({ vertical: "top", horizontal: "center" })}
        >
          Top-Center
        </Button> */}

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
  }
}

export default FavoritesSB;
