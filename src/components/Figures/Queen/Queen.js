import React from "react";
import { getOppositeColor } from "../../../hooks/commonHooks";

function Queen({ color }) {
  const oppositeColor = getOppositeColor(color);
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-100 0 1480.000000 1191.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,1191.000000) scale(0.100000,-0.100000)"
        fill={color}
        stroke="none"
      >
        <path
          d="M6247 11895 c-174 -33 -358 -114 -500 -221 -233 -175 -357 -441 -357
-765 0 -93 4 -118 34 -210 19 -57 54 -151 78 -209 248 -589 319 -1214 232
-2050 -43 -417 -119 -897 -228 -1435 -51 -252 -117 -559 -120 -563 -4 -3 -159
328 -259 553 -470 1059 -716 1868 -753 2480 -5 92 0 133 61 505 73 445 75 477
35 636 -24 95 -109 274 -181 381 -89 133 -218 247 -354 315 -236 118 -585 129
-841 28 -364 -145 -561 -351 -645 -675 -21 -80 -24 -112 -24 -290 1 -175 4
-210 23 -285 50 -186 145 -324 291 -423 100 -67 216 -185 269 -273 112 -187
185 -438 228 -784 33 -267 30 -1061 -6 -1550 -17 -226 -51 -564 -59 -584 -6
-16 -29 5 -146 130 -646 695 -971 1252 -1025 1754 -11 101 -10 117 35 450 64
468 58 556 -49 786 -144 306 -355 497 -641 580 -73 21 -118 27 -240 31 -227 8
-365 -21 -551 -113 -382 -190 -573 -528 -551 -975 15 -294 108 -508 312 -715
126 -127 240 -208 416 -293 l117 -56 6 -80 c37 -436 97 -873 172 -1245 54
-268 104 -474 286 -1165 163 -624 188 -724 195 -790 3 -33 17 -82 31 -110 61
-124 206 -321 452 -615 458 -548 729 -932 840 -1189 101 -236 87 -331 -113
-766 -190 -412 -300 -822 -314 -1172 l-6 -142 32 -65 c70 -143 227 -234 594
-345 459 -139 940 -229 1552 -290 488 -49 925 -70 1630 -77 516 -6 524 -6
1090 30 314 20 719 45 900 56 563 35 1068 109 1469 214 178 47 291 87 421 151
180 87 286 184 320 293 15 46 17 77 12 186 -4 72 -14 183 -22 246 -32 243 -42
281 -147 529 -131 309 -224 542 -288 721 -42 118 -52 157 -51 207 2 228 268
661 771 1253 58 69 153 184 210 255 57 72 143 175 191 230 149 173 209 278
209 374 1 51 28 171 104 447 274 1005 461 1940 542 2704 9 85 17 156 17 156 1
1 47 24 102 52 478 245 724 587 741 1032 l5 135 -55 174 c-60 188 -106 282
-192 396 -127 169 -301 282 -516 336 -107 26 -337 37 -444 20 -280 -46 -608
-261 -742 -487 -82 -138 -132 -322 -132 -489 0 -45 21 -234 46 -421 44 -327
45 -343 34 -444 -54 -502 -379 -1059 -1025 -1754 -117 -125 -140 -146 -146
-130 -10 24 -44 371 -66 674 -25 350 -25 1229 0 1425 41 310 107 550 203 734
70 135 151 232 267 319 153 116 225 204 279 342 52 134 63 201 63 395 0 160
-3 189 -24 265 -30 104 -130 305 -199 397 -179 242 -420 366 -739 380 -201 9
-344 -21 -540 -112 -347 -162 -527 -414 -565 -792 -12 -112 -12 -114 46 -523
65 -453 66 -483 30 -759 -84 -644 -419 -1622 -911 -2661 l-59 -125 -23 105
c-299 1384 -401 2248 -351 2958 18 248 38 333 179 763 195 594 191 580 191
658 0 223 -124 523 -291 705 -167 182 -379 273 -659 281 -93 3 -159 0 -213
-10z m283 -536 c106 -24 232 -120 277 -211 91 -181 61 -459 -62 -583 -53 -53
-145 -93 -239 -105 -92 -12 -134 -7 -238 26 -191 62 -293 191 -305 385 -6 95
14 185 64 283 88 174 285 254 503 205z m-2858 -588 c118 -46 204 -160 227
-301 38 -231 -24 -434 -157 -519 -76 -48 -151 -65 -282 -65 -315 0 -469 149
-470 456 0 245 101 391 308 443 89 23 300 15 374 -14z m5891 0 c110 -43 189
-125 223 -234 21 -67 29 -245 15 -320 -26 -143 -112 -253 -228 -297 -189 -71
-430 -40 -541 68 -102 100 -142 262 -111 452 27 167 153 311 306 350 21 5 92
8 158 6 95 -2 132 -8 178 -25z m-8359 -1147 c79 -20 132 -51 185 -109 79 -85
106 -189 99 -372 -6 -133 -26 -203 -82 -276 -92 -121 -286 -176 -459 -128
-103 28 -169 62 -229 119 -113 105 -155 281 -107 438 74 241 204 342 443 343
50 1 115 -6 150 -15z m10683 -9 c198 -61 306 -194 320 -395 19 -275 -108 -453
-350 -491 -141 -22 -293 3 -383 64 -108 72 -155 173 -162 350 -7 183 20 287
99 372 53 57 97 84 173 106 92 26 203 24 303 -6z m-4537 -4855 c1699 -56 2471
-263 2380 -639 -29 -122 -148 -193 -350 -207 -98 -7 -754 18 -1225 46 -642 40
-1069 60 -1475 71 -370 10 -487 9 -1085 -10 -368 -12 -733 -28 -809 -36 -696
-74 -1327 -94 -1487 -48 -134 39 -202 101 -215 196 -20 145 103 272 356 365
448 166 1262 255 2480 271 604 7 1002 5 1430 -9z m-155 -2240 c1095 -38 1765
-144 2077 -327 86 -50 133 -96 164 -159 23 -47 26 -64 22 -122 -11 -155 -106
-236 -310 -263 -63 -9 -129 -7 -336 10 -141 11 -390 28 -552 36 -1414 73
-1869 95 -1964 95 -62 0 -377 -14 -701 -30 -545 -28 -818 -45 -1555 -101 -157
-12 -303 -18 -340 -14 -229 22 -340 115 -340 285 0 103 66 182 214 254 422
205 1177 313 2361 335 600 12 943 12 1260 1z"
        />
      </g>
    </svg>
  );
}

export default Queen;