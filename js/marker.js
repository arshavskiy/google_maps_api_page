function inherits(e, t) {
    function s() {}
    s.prototype = t.prototype, e.superClass_ = t.prototype, e.prototype = new s, e.prototype.constructor = e
}

function MarkerLabel_(e, t) {
    this.marker_ = e, this.labelDiv_ = document.createElement("div"), this.labelDiv_.style.cssText = "position: absolute; overflow: hidden;", this.eventDiv_ = document.createElement("div"), this.eventDiv_.style.cssText = this.labelDiv_.style.cssText, this.eventDiv_.setAttribute("onselectstart", "return false;"), this.eventDiv_.setAttribute("ondragstart", "return false;"), this.crossDiv_ = MarkerLabel_.getSharedCross(t)
}

function MarkerWithLabel(e) {
    (e = e || {}).labelContent = e.labelContent || "", e.labelAnchor = e.labelAnchor || new google.maps.Point(0, 0), e.labelClass = e.labelClass || "markerLabels", e.labelStyle = e.labelStyle || {}, e.labelInBackground = e.labelInBackground || !1, void 0 === e.labelVisible && (e.labelVisible = !0), void 0 === e.crossOnDrag && (e.crossOnDrag = !0), void 0 === e.clickable && (e.clickable = !0), void 0 === e.draggable && (e.draggable = !1), void 0 === e.optimized && (e.optimized = !1), e.crossImage = e.crossImage || "//maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png", e.optimized = !1, this.label = new MarkerLabel_(this, e.crossImage), google.maps.Marker.apply(this, arguments)
}
inherits(MarkerLabel_, google.maps.OverlayView), MarkerLabel_.getSharedCross = function (e) {
    var t;
    return void 0 === MarkerLabel_.getSharedCross.crossDiv && ((t = document.createElement("img")).style.cssText = "position: absolute; z-index: 1000002; display: none;", t.style.marginLeft = "-8px", t.style.marginTop = "-9px", t.src = e, MarkerLabel_.getSharedCross.crossDiv = t), MarkerLabel_.getSharedCross.crossDiv
}, MarkerLabel_.prototype.onAdd = function () {
    var e = this;
    this.getPanes().markerLayer.appendChild(this.labelDiv_), this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_), void 0 === MarkerLabel_.getSharedCross.processed && (this.getPanes().overlayImage.appendChild(this.crossDiv_), MarkerLabel_.getSharedCross.processed = !0), this.addMouseListeners(), this.listeners2_ = [google.maps.event.addListener(this.marker_, "clickable_changed", function () {
        e.setClickable()
    }), google.maps.event.addListener(this.marker_, "cursor_changed", function () {
        e.setCursor()
    }), google.maps.event.addListener(this.marker_, "draggable_changed", function () {
        e.setClickable()
    }), google.maps.event.addListener(this.marker_, "position_changed", function () {
        e.setPosition()
    }), google.maps.event.addListener(this.marker_, "visible_changed", function () {
        e.setVisible()
    }), google.maps.event.addListener(this.marker_, "title_changed", function () {
        e.setTitle()
    }), google.maps.event.addListener(this.marker_, "zindex_changed", function () {
        e.setZIndex()
    }), google.maps.event.addListener(this.marker_, "labelanchor_changed", function () {
        e.setAnchor()
    }), google.maps.event.addListener(this.marker_, "labelclass_changed", function () {
        e.setStyles()
    }), google.maps.event.addListener(this.marker_, "labelcontent_changed", function () {
        e.setContent()
    }), google.maps.event.addListener(this.marker_, "labelstyle_changed", function () {
        e.setStyles()
    }), google.maps.event.addListener(this.marker_, "labelvisible_changed", function () {
        e.setVisible()
    })]
}, MarkerLabel_.prototype.addMouseListeners = function () {
    var e, t, s, i = this,
        a = !1,
        r = !1,
        l = !1,
        o = function (e) {
            (e = e || window.event).stopPropagation ? e.stopPropagation() : e.cancelBubble = !0, e.preventDefault ? e.preventDefault() : e.returnValue = !1
        },
        n = function (e) {
            (e = e || window.event).stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
        };
    this.listeners1_ = [google.maps.event.addDomListener(this.eventDiv_, "mouseover", function (e) {
        var t = {
            latLng: i.marker_.getPosition()
        };
        i.marker_.getClickable() || i.marker_.getDraggable() ? a || (this.style.cursor = i.marker_.getCursor() || "pointer", google.maps.event.trigger(i.marker_, "mouseover", t), o(e)) : this.style.cursor = null
    }), google.maps.event.addDomListener(this.eventDiv_, "mouseout", function (e) {
        var t = {
            latLng: i.marker_.getPosition()
        };
        (i.marker_.getClickable() || i.marker_.getDraggable()) && (a || (google.maps.event.trigger(i.marker_, "mouseout", t), o(e)))
    }), google.maps.event.addDomListener(this.eventDiv_, "mousedown", function (e) {
        var t = {
            latLng: i.marker_.getPosition()
        };
        l = !1, (i.marker_.getClickable() || i.marker_.getDraggable()) && (r = !0, google.maps.event.trigger(i.marker_, "mousedown", t), a || o(e))
    }), google.maps.event.addDomListener(this.eventDiv_, "mouseup", function (t) {
        var s = {
            latLng: i.marker_.getPosition()
        };
        r && (r = !1, google.maps.event.trigger(i.marker_, "mouseup", s), l && (l = !1, i.crossDiv_.style.display = "none", e = !0, google.maps.event.trigger(i.marker_, "dragend", s)), i.marker_.getDraggable() || o(t))
    }), google.maps.event.addDomListener(this.eventDiv_, "click", function (t) {
        var s = {
            latLng: i.marker_.getPosition()
        };
        (i.marker_.getClickable() || i.marker_.getDraggable()) && (e ? e = !1 : google.maps.event.trigger(i.marker_, "click", s), o(t))
    }), google.maps.event.addDomListener(this.eventDiv_, "dblclick", function (e) {
        var t = {
            latLng: i.marker_.getPosition()
        };
        (i.marker_.getClickable() || i.marker_.getDraggable()) && (google.maps.event.trigger(i.marker_, "dblclick", t), o(e))
    }), google.maps.event.addListener(this.marker_.getMap(), "mousemove", function (e) {
        var a;
        r && i.marker_.getDraggable() && (l ? (e.latLng = new google.maps.LatLng(e.latLng.lat() - t, e.latLng.lng() - s), i.marker_.get("crossOnDrag") && (a = i.getProjection().fromLatLngToDivPixel(e.latLng), i.crossDiv_.style.left = a.x + "px", i.crossDiv_.style.top = a.y + "px", i.crossDiv_.style.display = ""), google.maps.event.trigger(i.marker_, "drag", e)) : (t = e.latLng.lat() - i.marker_.getPosition().lat(), s = e.latLng.lng() - i.marker_.getPosition().lng(), l = !0, e.latLng = i.marker_.getPosition(), google.maps.event.trigger(i.marker_, "dragstart", e)))
    }), google.maps.event.addListener(this.marker_, "dragstart", function (e) {
        i.labelDiv_.style.zIndex = 1e6 + (this.get("labelInBackground") ? -1 : 1), i.eventDiv_.style.zIndex = i.labelDiv_.style.zIndex
    }), google.maps.event.addListener(this.marker_, "drag", function (e) {
        this.setPosition(e.latLng)
    }), google.maps.event.addListener(this.marker_, "dragend", function (e) {
        i.setZIndex()
    }), google.maps.event.addDomListener(this.eventDiv_, "touchstart", function (e) {
        a = !0, n(e)
    }), google.maps.event.addDomListener(this.eventDiv_, "touchmove", function (e) {
        n(e)
    }), google.maps.event.addDomListener(this.eventDiv_, "touchend", function (e) {
        n(e)
    })]
}, MarkerLabel_.prototype.removeMouseListeners = function () {
    var e;
    if (this.listeners1_)
        for (e = 0; e < this.listeners1_.length; e++) google.maps.event.removeListener(this.listeners1_[e])
}, MarkerLabel_.prototype.onRemove = function () {
    var e;
    if (this.labelDiv_.parentNode && this.labelDiv_.parentNode.removeChild(this.labelDiv_), this.eventDiv_.parentNode && this.eventDiv_.parentNode.removeChild(this.eventDiv_), this.removeMouseListeners(), this.listeners2_)
        for (e = 0; e < this.listeners2_.length; e++) google.maps.event.removeListener(this.listeners2_[e])
}, MarkerLabel_.prototype.draw = function () {
    this.setContent(), this.setTitle(), this.setStyles()
}, MarkerLabel_.prototype.setContent = function () {
    var e = this.marker_.get("labelContent");
    void 0 === e.nodeType ? (this.labelDiv_.innerHTML = e, this.eventDiv_.innerHTML = this.labelDiv_.innerHTML) : (this.labelDiv_.innerHTML = "", this.labelDiv_.appendChild(e), e = e.cloneNode(!0), this.eventDiv_.innerHTML = "", this.eventDiv_.appendChild(e))
}, MarkerLabel_.prototype.setTitle = function () {
    this.eventDiv_.title = this.marker_.getTitle() || ""
}, MarkerLabel_.prototype.setStyles = function () {
    var e, t;
    this.labelDiv_.className = this.marker_.get("labelClass"), this.eventDiv_.className = this.labelDiv_.className, this.labelDiv_.style.cssText = "", this.eventDiv_.style.cssText = "", t = this.marker_.get("labelStyle");
    for (e in t) t.hasOwnProperty(e) && (this.labelDiv_.style[e] = t[e], this.eventDiv_.style[e] = t[e]);
    this.setMandatoryStyles()
}, MarkerLabel_.prototype.setMandatoryStyles = function () {
    this.labelDiv_.style.position = "absolute", this.labelDiv_.style.overflow = "hidden", void 0 !== this.labelDiv_.style.opacity && "" !== this.labelDiv_.style.opacity && (this.labelDiv_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(opacity=' + 100 * this.labelDiv_.style.opacity + ')"', this.labelDiv_.style.filter = "alpha(opacity=" + 100 * this.labelDiv_.style.opacity + ")"), this.eventDiv_.style.position = this.labelDiv_.style.position, this.eventDiv_.style.overflow = this.labelDiv_.style.overflow, this.eventDiv_.style.cursor = "pointer", this.eventDiv_.style.opacity = .01, this.eventDiv_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(opacity=1)"', this.eventDiv_.style.filter = "alpha(opacity=1)", this.setAnchor(), this.setPosition(), this.setZIndex(), this.setVisible()
}, MarkerLabel_.prototype.setAnchor = function () {
    var e = this.marker_.get("labelAnchor");
    this.labelDiv_.style.marginLeft = -e.x + "px", this.labelDiv_.style.marginTop = -e.y + "px", this.eventDiv_.style.marginLeft = -e.x + "px", this.eventDiv_.style.marginTop = -e.y + "px"
}, MarkerLabel_.prototype.setPosition = function () {
    var e = this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());
    this.labelDiv_.style.left = Math.round(e.x) + "px", this.labelDiv_.style.top = Math.round(e.y) + "px", this.eventDiv_.style.left = this.labelDiv_.style.left, this.eventDiv_.style.top = this.labelDiv_.style.top
}, MarkerLabel_.prototype.setZIndex = function () {
    var e = this.marker_.get("labelInBackground") ? -1 : 1;
    void 0 === this.marker_.getZIndex() ? (this.labelDiv_.style.zIndex = parseInt(this.labelDiv_.style.top, 10) + e, this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex) : (this.labelDiv_.style.zIndex = this.marker_.getZIndex() + e, this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex)
}, MarkerLabel_.prototype.setClickable = function () {
    this.removeMouseListeners(), this.eventDiv_.style.cursor = null, (this.marker_.getClickable() || this.marker_.getDraggable()) && this.addMouseListeners()
}, MarkerLabel_.prototype.setCursor = function () {
    this.eventDiv_.style.cursor = this.marker_.getCursor()
}, MarkerLabel_.prototype.setVisible = function () {
    this.marker_.get("labelVisible") ? this.labelDiv_.style.display = this.marker_.getVisible() ? "block" : "none" : this.labelDiv_.style.display = "none", this.eventDiv_.style.display = this.labelDiv_.style.display
}, inherits(MarkerWithLabel, google.maps.Marker), MarkerWithLabel.prototype.setMap = function (e) {
    google.maps.Marker.prototype.setMap.apply(this, arguments), this.label.setMap(e)
};