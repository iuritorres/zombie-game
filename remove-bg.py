#!/usr/bin/env python3
"""
Remove green background from SNES sprite sheets.
Usage: python remove-bg.py <image_path> [tolerance]
"""

import sys
from PIL import Image
import numpy as np

BG_COLOR = (8, 112, 80)
DEFAULT_TOLERANCE = 10


def remove_background(path: str, tolerance: int = DEFAULT_TOLERANCE):
    img = Image.open(path).convert("RGBA")
    data = np.array(img)

    r, g, b = data[:, :, 0], data[:, :, 1], data[:, :, 2]

    mask = (
        (np.abs(r.astype(int) - BG_COLOR[0]) <= tolerance)
        & (np.abs(g.astype(int) - BG_COLOR[1]) <= tolerance)
        & (np.abs(b.astype(int) - BG_COLOR[2]) <= tolerance)
    )

    data[mask] = [0, 0, 0, 0]

    Image.fromarray(data).save(path)
    print(f"Done: {path} ({mask.sum()} pixels removed)")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python remove-bg.py <image_path> [tolerance]")
        sys.exit(1)

    image_path = sys.argv[1]
    tolerance = int(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_TOLERANCE

    remove_background(image_path, tolerance)
