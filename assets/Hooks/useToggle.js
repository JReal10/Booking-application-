ToggleButton.propTypes = {
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  icons: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
          checked: PropTypes.node,
          unchecked: PropTypes.node
      })
  ])
};