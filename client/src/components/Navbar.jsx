import React, { useState, useMemo, useRef } from 'react';


const Navbar = () => {
  return (
    <div style={{ display: "flex", flex_direction: "row", height: "100px", "z-index": "1000"}}>
      <i className="bi bi-heart" />
      <i class="bi bi-chat-heart" />
    </div>
  )

}

export default Navbar;