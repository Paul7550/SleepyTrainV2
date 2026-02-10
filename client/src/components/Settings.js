import React from 'react';
import './Settings.css';

function Settings({onBack, settings, onUpdateSettings, t}) {
    const handleChange = (key, value) => {
        onUpdateSettings({...settings, [key]: value});
    };

    const isCustomOffset = ![5, 10, 15, 20].includes(settings.defaultOffset);

    return (
        <div className="settings-container">
            <div className="settings-header">
                <button className="back-button" onClick={onBack} aria-label={t.back}>
                    &larr;
                </button>
                <h2>{t.settings}</h2>
            </div>

            <div className="settings-section">
                <h3>{t.general}</h3>
                <div className="setting-item">
                    <label>{t.defaultWakeUpTime}</label>
                    <select
                        value={isCustomOffset ? 'custom' : settings.defaultOffset}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === 'custom') {
                                if (!isCustomOffset) {
                                    handleChange('defaultOffset', 25);
                                }
                            } else {
                                handleChange('defaultOffset', parseInt(val));
                            }
                        }}
                        className="form-select"
                    >
                        <option value="5">5 {t.minutes}</option>
                        <option value="10">10 {t.minutes}</option>
                        <option value="15">15 {t.minutes}</option>
                        <option value="20">20 {t.minutes}</option>
                        <option value="custom">{t.custom || 'Custom'} {t.minutes}</option>
                    </select>
                    {isCustomOffset && (
                        <div className="mt-2">
                            <input
                                type="number"
                                min="1"
                                max="120"
                                className="form-control"
                                value={settings.defaultOffset}
                                onChange={(e)=> handleChange('defaultOffset', parseInt(e.target.value) || 0)}
                            />
                        </div>
                    )}
                </div>

                <div className="setting-item">
                    <label>{t.language}</label>
                    <select
                        value={settings.language}
                        onChange={(e) => handleChange('language', e.target.value)}
                        className="form-select"
                    >
                        <option value="de">{t.german}</option>
                        <option value="en">{t.english}</option>
                    </select>
                </div>
            </div>

            <div className="settings-section">
                <h3>{t.alarm}</h3>
                <div className="setting-item">
                    <label>{t.ringtone}</label>
                    <select
                        value={settings.sound}
                        onChange={(e) => handleChange('sound', e.target.value)}
                        className="form-select"
                    >
                        <option value="alarm.mp3">{t.standard}</option>
                        <option value="gentle.mp3">{t.gentle}</option>
                        <option value="digital.mp3">{t.digital}</option>
                    </select>
                </div>

                <div className="setting-item checkbox-item">
                    <label htmlFor="vibration">{t.vibration}</label>
                    <input
                        type="checkbox"
                        id="vibration"
                        checked={settings.vibration}
                        onChange={(e) => handleChange('vibration', e.target.checked)}
                    />
                </div>

                <div className="setting-item range-item">
                    <label>{t.volume} ({settings.volume}%)</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={settings.volume}
                        onChange={(e) => handleChange('volume', parseInt(e.target.value))}
                        className="form-range"
                    />
                </div>
            </div>

            <div className="settings-section">
                <h3>{t.appearance}</h3>
                <div className="setting-item checkbox-item">
                    <label htmlFor="darkMode">{t.darkMode}</label>
                    <input
                        type="checkbox"
                        id="darkMode"
                        checked={settings.isDarkMode}
                        onChange={(e) => handleChange('isDarkMode', e.target.checked)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Settings;
