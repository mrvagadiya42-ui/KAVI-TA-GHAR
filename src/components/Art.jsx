/* Original 3D-STYLE animated tasveer ka React component
   (code se bani — koi video file nahi, zero copyright) */

window.KG = window.KG || {};

KG.Art = function Art({ scene, className, flat }) {
  /* flat = true → simple SVG (PDF/print ke liye — animation nahi chalti) */
  const html = React.useMemo(
    () => flat ? KG.ART.build(scene || []) : KG.ART3D.build(scene || []),
    [scene, flat]
  );
  return <span
    className={(flat ? "art-svg " : "art3d ") + (className || "")}
    dangerouslySetInnerHTML={{ __html: html }}
    style={{ display: "block", lineHeight: 0 }}
  />;
};